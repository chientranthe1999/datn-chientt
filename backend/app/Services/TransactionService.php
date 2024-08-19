<?php
namespace App\Services;


use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionService extends BaseService
{

    public function __construct(private readonly WalletService $walletService)
    {
        parent::__construct();
    }

    public function model(): string
    {
        return Transaction::class;
    }

    public function store(array $attributes): Transaction
    {
        DB::beginTransaction();
        try {
            $attributes['user_id'] = auth()->id();
            $result = $this->model->query()->create($attributes);

            if(($attributes['report_exclude'] ?? false) && $result) {
                $this->walletService->updateBalance($attributes['category_id'],$attributes['wallet_id'], $attributes['amount'],);
            }

            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function addFilter($query, $params): void
    {
       $query->when(!empty($params['start_date']), function ($builder) use ($params) {
          $builder->where('action_time', '>=', $params['start_date']);
       });

        $query->when(!empty($params['end_date']), function ($builder) use ($params) {
            $builder->where('action_time', '<=', $params['end_date']);
        });

        $query->when(!empty($params['category_id']), function ($builder) use ($params) {
            $builder->where('category_id', $params['category_id']);
        });

        $query->when(!empty($params['wallet_id']), function ($builder) use ($params) {
            $builder->where('wallet_id', $params['wallet_id']);
        });
    }
}
