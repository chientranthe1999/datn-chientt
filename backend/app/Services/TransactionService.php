<?php
namespace App\Services;


use App\Models\Transaction;

class TransactionService extends BaseService
{

    public function model(): string
    {
        return Transaction::class;
    }
}
