<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->string('codigo')->unique(); // Código único
            $table->unsignedBigInteger('cliente')->nullable(); // Cliente (nullable)
            $table->unsignedBigInteger('vendedor')->nullable(); // Vendedor (nullable)
            $table->text('detalle')->nullable(); // Detalle (nullable)
            $table->string('pago')->nullable(); // Tipo de pago (nullable)
            $table->string('estado')->default('Pendiente'); // Estado con valor predeterminado "Pendiente"
            $table->decimal('total', 10, 2)->nullable(); // Total (nullable)
            $table->timestamps(); // Incluye campos de created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
