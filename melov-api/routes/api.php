<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\PedidoController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('producto', [ProductoController::class, 'index']); // Listar productos
Route::post('producto', [ProductoController::class, 'store']); // Crear producto
Route::get('producto/{id}', [ProductoController::class, 'show']); // Mostrar detalle de un producto
Route::post('producto/{id}', [ProductoController::class, 'update']); // Actualizar producto
Route::delete('producto/{id}', [ProductoController::class, 'destroy']); // Eliminar producto

Route::get('pedido', [PedidoController::class, 'index']);
Route::post('pedido', [PedidoController::class, 'store']);
Route::get('pedido/{codigo}', [PedidoController::class, 'show']);
Route::patch('pedido/{codigo}', [PedidoController::class, 'update']);
Route::delete('pedido/{codigo}', [PedidoController::class, 'destroy']);
