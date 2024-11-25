<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->string('nombre', 255)->notNullable(); // Nombre: VARCHAR(255) NOT NULL
            $table->text('descripcion')->nullable(); // Descripción: TEXT (puede ser nulo)
            $table->decimal('precio', 10, 2)->default(0.00); // Precio: DECIMAL(10,2) con valor por defecto 0.00
            $table->string('foto', 255)->nullable(); // Foto: VARCHAR(255) (puede ser nulo)
            $table->string('categoria')->nullable(); // categoria: VARCHAR (puede ser nulo)
            $table->boolean('estado')->default(true); // Estado: BOOLEAN con valor por defecto true
            $table->timestamps(); // Created_at y Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto');
    }
};
