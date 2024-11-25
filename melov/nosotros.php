<?php
// Permitir cualquier origen (útil para pruebas locales)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$ruta = 'http://localhost/melov/nosotros/';
$imagenes = [
    $ruta . "1.webp",
    $ruta . "2.webp",
    $ruta . "3.webp",
    $ruta . "4.webp",
];

// Convierte el arreglo a JSON y lo muestra
header('Content-Type: application/json');
echo json_encode($imagenes);
