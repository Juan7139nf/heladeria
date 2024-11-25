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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->string('usuario')->unique(); // Usuario único
            $table->string('nombre')->nullable(); // Nombre (puede ser nulo)
            $table->string('apellido')->nullable(); // Apellido (puede ser nulo)
            $table->string('email')->unique(); // Email único
            $table->timestamp('email_verified_at')->nullable(); // Verificación de email
            $table->string('password'); // Contraseña
            $table->string('rol')->default('Cliente'); // Rol con valor por defecto "Cliente"
            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
