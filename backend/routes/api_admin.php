<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function() {
    return response()->json(['status' => 'OK']);
});

Route::post('login', [AuthController::class, 'login'])->name('admin.login');
Route::post('register', [AuthController::class, 'create'])->name('admin.register');
Route::post('refresh_token', [AuthController::class, 'refreshToken'])->name('admin.refresh_token');

Route::middleware('auth:api_admin')->group(function() {
    Route::post('logout', [AuthController::class, 'logout'])->name('admin.logout');
    Route::get('profile', [AuthController::class, 'profile'])->name('admin.profile');
});
