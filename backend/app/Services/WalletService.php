<?php

namespace App\Services;


use App\Models\Category;
use App\Models\Wallet;

class WalletService extends BaseService
{

    public function model(): string
    {
        return Wallet::class;
    }

    public function getCategoryOptions(bool $onlyParent = false): \Illuminate\Database\Eloquent\Collection|array
    {
        return $this->model
            ->query()
            ->where('user_id', auth()->id())
            ->when($onlyParent, fn($q) => $q->where('group_id', 0))
            ->get(['id', 'name', 'group_id', 'type']);
    }

    public function getCategoryTree(): \Illuminate\Database\Eloquent\Collection|array
    {
        return $this->model->with('children')
            ->where('group_id', 0)
            ->where('user_id', auth()->id())
            ->get();
    }

}
