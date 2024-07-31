<?php

namespace App\Http\Controllers;

use App\Constants\Common;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MarcinOrlowski\ResponseBuilder\Exceptions\ArrayWithMixedKeysException;
use MarcinOrlowski\ResponseBuilder\Exceptions\ConfigurationNotFoundException;
use MarcinOrlowski\ResponseBuilder\Exceptions\IncompatibleTypeException;
use MarcinOrlowski\ResponseBuilder\Exceptions\InvalidTypeException;
use MarcinOrlowski\ResponseBuilder\Exceptions\MissingConfigurationKeyException;
use MarcinOrlowski\ResponseBuilder\Exceptions\NotIntegerException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CategoryController extends Controller
{

    public function __construct(private readonly CategoryService $service)
    {
    }

    public function index(Request $r)
    {
        return $this->respond($this->service->paginate($r->all()));
    }

    public function getCategoryOptions(Request $r)
    {
        return $this->respond($this->service->getCategoryOptions($r->input('only_parent', false)));
    }

    /**
     * @throws \Exception
     */
    public function create(CreateCategoryRequest $r)
    {
        $data = $r->only(['group_id', 'name', 'type', 'icon', 'report_exclude']);
        $data['icon'] = $data['icon'] ?? Common::CATEGORY_DEFAULT_ICON;
        $data['report_exclude'] = $data['report_exclude'] ?? false;
        $data['user_id'] = Auth::user()->id;

        $this->respond($this->service->store($data));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
