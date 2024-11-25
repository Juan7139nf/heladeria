<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Pedido extends Model
{
    use HasFactory;

    // Campos rellenables
    protected $fillable = [
        'cliente',
        'vendedor',
        'detalle',
        'pago',
        'estado',
        'total',
    ];

    // Generar automáticamente el código al crear un pedido
    protected static function booted()
    {
        static::creating(function ($pedido) {
            $pedido->codigo = Carbon::now('America/La_Paz')->format('YmdHisv'); // Fecha, hora y milisegundos
        });
    }
}
