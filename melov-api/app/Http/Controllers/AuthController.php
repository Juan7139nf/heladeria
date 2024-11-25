<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Registrar un usuario
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'required|string|unique:users,usuario',
            'nombre' => 'nullable|string',
            'apellido' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::create([
            'usuario' => $request->usuario,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Encriptar la contraseña
        ]);

        return response()->json(['message' => 'Usuario registrado con éxito', 'user' => $user], 201);
    }

    // Iniciar sesión
    public function login(Request $request)
    {
        // Validación de los datos de inicio de sesión
        $credentials = $request->validate([
            'usuario' => 'required|string', // Usuario es opcional
            'password' => 'required|string', // Contraseña es obligatoria
        ]);

        // Buscar el usuario por nombre de usuario o email
        $user = User::where('usuario', $credentials['usuario'])
            ->orWhere('email', $credentials['usuario'])
            ->first();

        // Verificar si el usuario existe y si la contraseña es correcta
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // Si la autenticación es exitosa, retornar respuesta
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
        ], 200);
    }
}
