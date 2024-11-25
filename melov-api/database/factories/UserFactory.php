<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'usuario' => fake()->unique()->userName(), // Nombre de usuario único
            'nombre' => fake()->firstName(),          // Nombre opcional
            'apellido' => fake()->lastName(),         // Apellido opcional
            'email' => fake()->unique()->safeEmail(), // Email único
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'), // Contraseña encriptada
            'rol' => 'Cliente',   
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
