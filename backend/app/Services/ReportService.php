<?php
namespace App\Services;


use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ReportService extends BaseService
{

    public function __construct(
        private readonly WalletService $walletService,
        private readonly TransactionService $transactionService
    )
    {
        parent::__construct();
    }

    public function model(): string
    {
        return Transaction::class;
    }

    public function getTransactionDashBoard()
    {
        // current balance
        $balance = $this->walletService->getTotalWalletBalance();

        $transactionCalculator = $this->transactionService->getTotalIncomeAndExpense();
    }
}
