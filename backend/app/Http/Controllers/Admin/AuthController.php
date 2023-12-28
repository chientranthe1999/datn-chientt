<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Admin\LoginRequest;
use App\Http\Requests\Admin\Admin\LogoutRequest;
use App\Http\Requests\Admin\Admin\RefreshTokenRequest;
use App\Http\Requests\Admin\Admin\RegisterRequest;
use App\Models\Admin;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @throws \Exception
     */
    public function create(RegisterRequest $request)
    {
        $result = DB::transaction(function() use ($request) {
            $data = $request->only('name', 'email', 'password', 'avt');

            return $this->authService->register(User::class, ...array_values($data));
        });

        return $this->respond($result['user']);
    }

    public function login(LoginRequest $request): \Symfony\Component\HttpFoundation\Response
    {
        $data = $request->only('email', 'password');

        return $this->respond($this->authService->login(User::class, ...array_values($data)));
    }

    public function logout(LogoutRequest $request)
    {
        $user = auth()->user();
        $this->authService->revokeToken($user->token());

        return $this->respond();
    }

    public function refreshToken(RefreshTokenRequest $request)
    {
        $data = $request->only('refresh_token');

        $result = $this->authService->refreshToken(Admin::class, $data['refresh_token']);
        if (!$result) {
            throw new UnauthorizedHttpException('', __('api.exception.invalid_refresh_token'));
        }

        return $this->respond($result);
    }

    public function profile()
    {
        $user = auth()->user();

        return $this->respond(['user' => $user]);
    }
}

