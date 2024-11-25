<?php
// Permitir cualquier origen (útil para pruebas locales)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$ruta = 'http://localhost/melov/fotos/local/';
$imagenes = [
    $ruta . "helado.jpg",
    $ruta . "helado2.jpg",
    $ruta . "helad.jpg",
    $ruta . "heladeria.jpg",
    $ruta . "local_por_fuera1.jpg",
    $ruta . "muestra_de_helado.jpg",
];

// Convierte el arreglo a JSON y lo muestra
header('Content-Type: application/json');
echo json_encode($imagenes);
