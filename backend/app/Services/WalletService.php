<?php

namespace App\Services;


use App\Constants\Common;
use App\Models\Category;
use App\Models\Wallet;
use Illuminate\Support\Facades\DB;

class WalletService extends BaseService
{

    public function model(): string
    {
        return Wallet::class;
    }

    public function updateBalance($categoryId, $walletId, $amount, $restore = false): void
    {
        $category = DB::table('categories')->where('id', $categoryId)->first(['type']);
        if(!$category) {
            return;
        }
        $balanceAdjustment = match ($category->type) {
            Common::CATEGORY_TYPE['DEBT'],
            Common::CATEGORY_TYPE['EXPENSE'] => $amount,
            Common::CATEGORY_TYPE['INCOME'],
            Common::CATEGORY_TYPE['SALARY'] => -$amount,
            default => 0
        };

        $balanceAdjustment = $restore ? -$balanceAdjustment : $balanceAdjustment;

        DB::table('wallets')->where('id', $walletId)->update([
            'total' => DB::raw("total + {$balanceAdjustment}")
        ]);
    }

    public function getTotalWalletBalance(): float
    {
        return DB::table('wallets')->sum('total');
    }
}
