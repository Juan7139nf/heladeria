<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PedidoController extends Controller
{
    // Crear un nuevo pedido.
    public function store(Request $request)
    {
        $data = $request->validate([
            'cliente' => 'nullable|integer',
            'vendedor' => 'nullable|integer',
            'detalle' => 'nullable|string',
            'pago' => 'nullable|string',
            'estado' => 'nullable|string',
            'total' => 'nullable|numeric',
        ]);

        $pedido = Pedido::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Pedido creado exitosamente.',
            'pedido' => $pedido,
        ], 201);
    }

    // Actualizar un pedido parcialmente (PATCH).
    public function update(Request $request, $codigo)
    {
        // Validar los datos recibidos
        $data = $request->validate([
            'cliente' => 'nullable|integer',
            'vendedor' => 'nullable|integer',
            'detalle' => 'nullable|string',
            'pago' => 'nullable|string',
            'estado' => 'nullable|string',
            'total' => 'nullable|numeric',
        ]);

        // Asegurarse de que el 'codigo' es un string
        $codigo = (string) $codigo;

        // Buscar el pedido por el 'codigo'
        $pedido = Pedido::where('codigo', $codigo)->first();

        // Validar si el pedido existe
        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado.',
            ], 404);
        }

        // Aquí realizamos la actualización directamente sobre la consulta
        $pedidoUpdated = Pedido::where('codigo', $codigo)->update($data);

        // Verificar si la actualización fue exitosa
        if ($pedidoUpdated) {
            // Obtener el pedido actualizado para devolverlo
            $pedido = Pedido::where('codigo', $codigo)->first();

            return response()->json([
                'success' => true,
                'message' => 'Pedido actualizado exitosamente.',
                'pedido' => $pedido, // El pedido actualizado
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No se pudo actualizar el pedido.',
            ]);
        }
    }

    // Obtener un pedido específico.
    public function show($codigo)
    {
        // Buscar el pedido por el campo 'codigo'
        $pedido = Pedido::where('codigo', $codigo)->first();

        // Validar si se encontró el pedido
        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado.',
            ], 404);
        }

        // Restar 4 horas a los campos 'created_at' y 'updated_at'
        $pedido->created_at = Carbon::parse($pedido->created_at)->subHours(4);
        $pedido->updated_at = Carbon::parse($pedido->updated_at)->subHours(4);

        // Obtener el nombre y apellido del cliente usando el ID
        $cliente = User::find($pedido->cliente); // Buscar cliente por su ID
        $vendedor = User::find($pedido->vendedor); // Buscar vendedor por su ID

        // Añadir nombre y apellido del cliente y vendedor
        $pedido->cliente_nombre = $cliente ? $cliente->nombre . ' ' . $cliente->apellido : null;
        $pedido->vendedor_nombre = $vendedor ? $vendedor->nombre . ' ' . $vendedor->apellido : null;

        return response()->json([
            'success' => true,
            'pedido' => $pedido,
        ]);
    }

    // Eliminar un pedido.
    public function destroy($codigo)
    {
        // Buscar el pedido por el 'codigo'
        $pedido = Pedido::where('codigo', $codigo)->first();

        // Validar si el pedido existe
        if (!$pedido) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado.',
            ], 404);
        }

        // Eliminar el pedido
        try {
            // Borrar el pedido
            Pedido::where('codigo', $codigo)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pedido eliminado exitosamente.',
            ]);
        } catch (\Exception $e) {
            // En caso de que ocurra un error durante la eliminación
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el pedido: ' . $e->getMessage(),
            ], 500);
        }
    }

    // Listar todos los pedidos.
    public function index()
    {
        // Obtener los pedidos ordenados de manera descendente por el campo 'codigo'
        $pedidos = Pedido::orderBy('codigo', 'desc')->get();

        // Restar 4 horas a los campos 'created_at' y 'updated_at' de cada pedido
        $pedidos->transform(function ($pedido) {
            // Restar 4 horas de cada fecha
            $pedido->created_at = Carbon::parse($pedido->created_at)->subHours(4);
            $pedido->updated_at = Carbon::parse($pedido->updated_at)->subHours(4);

            // Obtener el nombre y apellido del cliente usando el ID
            $cliente = User::find($pedido->cliente); // Buscar cliente por su ID
            $vendedor = User::find($pedido->vendedor); // Buscar vendedor por su ID

            // Añadir nombre y apellido del cliente y vendedor
            $pedido->cliente_nombre = $cliente ? $cliente->nombre . ' ' . $cliente->apellido : null;
            $pedido->vendedor_nombre = $vendedor ? $vendedor->nombre . ' ' . $vendedor->apellido : null;

            return $pedido;
        });

        return response()->json([
            'success' => true,
            'pedidos' => $pedidos,
        ]);
    }
}
