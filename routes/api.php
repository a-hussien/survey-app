<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::prefix('v1')->group(function() {

    Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

    Route::middleware(['auth:sanctum'])->group( function () {
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
    });
});

