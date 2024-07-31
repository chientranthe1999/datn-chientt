<?php

namespace App\Services;


use App\Models\Category;

class CategoryService extends BaseService
{

    public function model(): string
    {
        return Category::class;
    }

    public function getCategoryOptions(bool $onlyParent = false): \Illuminate\Database\Eloquent\Collection|array
    {
        $query = $this->model->query();
        if ($onlyParent) {
            $query->where('group_id', 0);
        }
        return $query->get(['id', 'name', 'group_id']);
    }
}
