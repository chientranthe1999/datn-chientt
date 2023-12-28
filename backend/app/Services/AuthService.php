<?php

namespace App\Services;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;
use Laravel\Passport\Client as OClient;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\Exceptions\AuthenticationException;
use Laravel\Passport\Token;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response as HttpResponse;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;

class AuthService
{
    protected $oClient;
    protected $guards;

    public function __construct()
    {
        $this->_retrieveClients();
    }

    private function _retrieveClients(): void
    {
        $clients = OClient::query()->where('password_client', 1)->get();
        $configProviders = config('auth.providers');
        $configGuards = config('auth.guards');

        $providerGuardMaps = [];
        foreach ($configGuards as $guard => $configGuard) {
            if (isset($configGuard['provider']) && $configGuard['driver'] === 'session') {
                $providerGuardMaps[$configGuard['provider']] = $guard;
            }
        }

        foreach ($clients as $client) {
            if (isset($client['provider']) && isset($configProviders[$client['provider']])) {
                $model = $configProviders[$client['provider']]['model'];
                $this->oClient[$model] = $client;
                $this->guards[$model] = $providerGuardMaps[$client['provider']];
            }
        }
    }

    private function _getClient(string $key)
    {
        return $this->oClient[$key] ?? null;
    }

    private function _getGuard(string $key)
    {
        return $this->guards[$key] ?? null;
    }

    /**
     * @throws Exception
     */
    public function register(string $modelNamespace, $name, $email, $password, $avt = ''): array
    {
        $data = compact('name', 'email', 'password', 'avt');
        $data['password'] = Hash::make($password);

        // send email active
        // save login history
        $data['is_active'] = true;
        $user = $modelNamespace::create($data);

        $tokenData = $this->generateToken($modelNamespace, $email, $password);
        if (!$tokenData) {
            throw new BadRequestException("There is an error happen when create token");
        }

        return Arr::add($tokenData, 'user', $user);
    }

    /**
     * @throws Exception
     */
    public function login(string $modelNamespace, $email, $password)
    {
        $result = [];
        $result['token'] = $this->generateToken($modelNamespace, $email, $password);
        if (!$result['token']) {
            throw new AuthenticationException();
        }
        $guard = auth($this->_getGuard($modelNamespace));
        if ($guard && $guard->attempt(compact('email', 'password'))) {
            $result['user'] = $guard->user();
        }

        return $result;
    }

    public function logout($user)
    {
        return $this->revokeToken($user->token());
    }

    public function profile(): ?\Illuminate\Contracts\Auth\Authenticatable
    {
        return auth()->user();
    }

    /**
     * @param string $modelNamespace
     * @param $email
     * @param $password
     * @return mixed|null
     * @throws Exception
     */
    public function generateToken(string $modelNamespace, $email, $password): mixed
    {
        $oClient = $this->_getClient($modelNamespace);
        if (!$oClient) return null;

        $request = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'password',
            'client_id' => (string)$oClient->id,
            'client_secret' => $oClient->secret,
            'username' => $email,
            'password' => $password,
            'scope' => '*',
        ]);
        $response = app()->handle($request);
        if ($response->getStatusCode() === HttpResponse::HTTP_OK) {
            return json_decode((string)$response->getContent(), true);
        }
        return null;
    }

    /**
     * @param string $modelNamespace
     * @param string $refreshToken
     * @return mixed|null
     * @throws Exception
     */
    public function refreshToken(string $modelNamespace, string $refreshToken)
    {
        $oClient = $this->_getClient($modelNamespace);
        if (!$oClient) return null;

        $request = Request::create('/oauth/token', 'POST', [
            'grant_type' => 'refresh_token',
            'client_id' => (string)$oClient->id,
            'client_secret' => $oClient->secret,
            'refresh_token' => $refreshToken,
            'scope' => '*',
        ]);
        $response = app()->handle($request);
        if ($response->getStatusCode() === HttpResponse::HTTP_OK) {
            return json_decode((string)$response->getContent(), true);
        }
        return null;
    }

    /**
     * @param Token $token
     * @return mixed
     */
    public function revokeToken(Token $token)
    {
        $tokenRepository = app(TokenRepository::class);
        $refreshTokenRepository = app(RefreshTokenRepository::class);

        $tokenRepository->revokeAccessToken($token->id);
        return $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);
    }

    /**
     * @param Authenticatable $user
     * @param bool $include
     */
    public function revokeAllTokens(Authenticatable $user, bool $include = true)
    {
        $tokens = $user->tokens;
        $currentToken = $user->token();
        if (count($tokens)) {
            foreach ($tokens as $token) {
                if ($token === $currentToken && !$include) continue;
                $this->revokeToken($token);
            }
        }
    }
}
