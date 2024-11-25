<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear 3 usuarios utilizando la fábrica
        User::factory()->create([
            'usuario' => 'liz',
            'nombre' => 'Liz',
            'apellido' => 'Laime',
            'email' => 'liz@gmail.com',
            'password' => Hash::make('password123'),
            'rol' => 'Administrador',
        ]);

        User::factory()->create([
            'usuario' => 'mayra',
            'nombre' => 'Mayra',
            'apellido' => 'Villca',
            'email' => 'mayra@gmail.com',
            'password' => Hash::make('password123'),
            'rol' => 'Vendedor',
        ]);

        User::factory()->create([
            'usuario' => '982jdk',
            'nombre' => 'Juan',
            'apellido' => 'Flores',
            'email' => 'juan@gmail.com',
            'password' => Hash::make('password123'),
            'rol' => 'Cliente',
        ]);
    }
}
