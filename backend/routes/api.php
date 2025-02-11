<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\UserController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']); // Both roles can register
Route::post('/login', [AuthController::class, 'login']); // Login for both roles
Route::get('/buku/top', [BukuController::class, 'getTopBooks']);
Route::post('/user/profile-photo', [UserController::class, 'updateProfilePhoto']);
Route::get('/user/search', [UserController::class, 'search'])->middleware('admin');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'user']); // View profile
    Route::put('/profile', [AuthController::class, 'updateProfile']); // Update profile
    Route::post('/logout', [AuthController::class, 'logout']); // Logout

    // Buku Routes
    Route::get('/buku', [BukuController::class, 'index']); // View all books (admin/anggota)
    Route::get('/buku/{id}', [BukuController::class, 'show']); // View single book (admin/anggota)
    Route::post('/buku', [BukuController::class, 'store']); // Create a book
    Route::put('/buku/{id}', [BukuController::class, 'update']); // Update a book
    Route::delete('/buku/{id}', [BukuController::class, 'destroy']); // Delete a book

    // Peminjaman Routes
    Route::get('/peminjaman', [PeminjamanController::class, 'index']); // View loans (admin: all, anggota: own)
    Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show']); // View single loan (admin: all, anggota: own)
    Route::post('/peminjaman', [PeminjamanController::class, 'store']); // Create a loan
    Route::match(['put', 'patch'], '/peminjaman/{id}', [PeminjamanController::class, 'update']);// Update a loan
    Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy']); // Delete a loan
    Route::get('/peminjaman/user/{id_user}', [PeminjamanController::class, 'getByUser']);
    Route::post('/peminjaman/check', [PeminjamanController::class, 'checkUserBook']);
    
    // Pengembalian Routes
    Route::get('/pengembalian', [PengembalianController::class, 'index']); // View returns (admin: all, anggota: own)
    Route::get('/pengembalian/{id}', [PengembalianController::class, 'show']); // View single return (admin: all, anggota: own)
    Route::post('/pengembalian', [PengembalianController::class, 'store']); // Create a return
    Route::put('/pengembalian/{id}', [PengembalianController::class, 'update']); // Update a return
    Route::delete('/pengembalian/{id}', [PengembalianController::class, 'destroy']); // Delete a return
    Route::put('/pengembalian/{id_pengembalian}/clear-fine', [PengembalianController::class, 'clearFine']);

    // User Routes
    Route::get('/user', [UserController::class, 'index']); // View all users (admin only)
    Route::get('/user/{id}', [UserController::class, 'show']); // View single user (admin: any, anggota: own)
    Route::post('/user', [UserController::class, 'store']); // Create a user
    Route::put('/user/{id}', [UserController::class, 'update']); // Update a user
    Route::delete('/user/{id}', [UserController::class, 'destroy']); // Delete a user
    Route::post('/user/profile-photo', [UserController::class, 'updateProfilePhoto']);
});
