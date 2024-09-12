<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/users', [UserController::class, 'register']);
Route::post('/users/login', [UserController::class, 'login']);

Route::middleware('api_auth')->group(function (){
    Route::get('/users/current', [UserController::class, 'getUser']);
    Route::patch('/users/current', [UserController::class, 'update']);
    Route::delete('/users/logout', [UserController::class, 'logout']);

    Route::post('/contacts', [ContactController::class, 'create']);
    Route::get('/contacts', [ContactController::class, 'search']);
    Route::get('/contacts/{id}', [ContactController::class, 'getContact']);
    Route::put('/contacts/{id}', [ContactController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactController::class, 'delete']);

    Route::post('/contacts/{idContact}/addresses', [AddressController::class, 'create']);
    Route::get('/contacts/{idContact}/addresses', [AddressController::class, 'list']);
    Route::get('/contacts/{idContact}/addresses/{idAddress}', [AddressController::class, 'get']);
    Route::put('/contacts/{idContact}/addresses/{idAddress}', [AddressController::class, 'update']);
    Route::delete('/contacts/{idContact}/addresses/{idAddress}', [AddressController::class, 'delete']);
});
