<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Intervention\Image\Facades\Image; // Importar Intervention Image

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all(); // Obtener todos los productos

        if ($productos->isEmpty()) {
            // Si no hay productos, retornar un 404 con mensaje
            return response()->json([
                'message' => 'No hay productos disponibles',
                'status' => 404
            ], 404);
        }

        // Recorremos los productos para agregar la URL completa de la foto
        foreach ($productos as $producto) {
            $producto->foto = $producto->foto ? asset('storage/' . $producto->foto) : null;
        }

        // Si hay productos, retornar un 200 con los productos
        return response()->json($productos, 200);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'foto' => 'nullable|image|max:2048', // Validar que sea una imagen (máx. 2 MB)
            'categoria' => 'nullable|string',
        ]);

        if ($request->hasFile('foto')) {
            // Guardar la imagen y obtener la ruta relativa
            $path = $request->file('foto')->store('uploads/fotos', 'public');
            $validated['foto'] = $path; // Guardar la ruta relativa en la base de datos
        }

        $producto = Producto::create($validated); // Crear el producto

        // Agregar la URL completa de la foto al JSON de respuesta
        $producto->foto = $producto->foto ? asset('storage/' . $producto->foto) : null;

        return response()->json([
            'message' => 'Producto creado exitosamente',
            'producto' => $producto,
        ], 201);
    }

    // Mostrar detalle de un producto
    public function show($id)
    {
        // Buscar el producto por su ID
        $producto = Producto::find($id);

        // Verificar si el producto existe
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        // Agregar la URL completa de la foto si existe
        $producto->foto = $producto->foto ? asset('storage/' . $producto->foto) : null;

        // Retornar el producto con la URL de la foto
        return response()->json($producto);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        // Buscar el producto por su ID
        $producto = Producto::find($id);

        // Verificar si el producto existe
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        // Validación de los datos de entrada
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'foto' => 'nullable|image|max:2048', // Validar que sea una imagen (máx. 2 MB)
            'categoria' => 'nullable|string',
            'estado' => 'nullable|boolean',
        ]);

        // Verificar si se ha subido una nueva foto
        if ($request->hasFile('foto')) {
            // Eliminar la foto anterior si existe
            if ($producto->foto) {
                \Storage::disk('public')->delete($producto->foto);
            }

            // Guardar la nueva foto
            $path = $request->file('foto')->store('uploads/fotos', 'public');
            $validated['foto'] = $path; // Asignar la ruta de la nueva foto
        }

        // Actualizar los datos del producto con los datos validados
        $producto->update($validated);

        // Agregar la URL completa de la foto al producto
        $producto->foto = $producto->foto ? asset('storage/' . $producto->foto) : null;

        // Retornar una respuesta JSON con el producto actualizado
        return response()->json([
            'message' => 'Producto actualizado exitosamente',
            'producto' => $producto,
        ]);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        $producto->delete(); // Eliminar el producto
        return response()->json(['message' => 'Producto eliminado exitosamente']);
    }
}
