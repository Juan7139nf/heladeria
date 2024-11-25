<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'producto';

    // Clave primaria de la tabla (si no es "id" por defecto)
    protected $primaryKey = 'id';

    // Indicar si los timestamps (created_at y updated_at) deben ser gestionados automáticamente
    public $timestamps = true;

    // Definir los campos que son asignables masivamente
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'foto',
        'categoria',
        'estado',
    ];

    // Definir los campos que deberían ser ocultados en las respuestas JSON
    protected $hidden = [
        // Agregar campos que quieras ocultar (si es necesario)
    ];

    // Configurar castings para campos específicos (si es necesario)
    protected $casts = [
        'precio' => 'decimal:2',
        'estado' => 'boolean',
    ];
}
