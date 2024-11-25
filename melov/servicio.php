<?php
// Permitir cualquier origen (útil para pruebas locales)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$ruta = 'http://localhost/melov/fotos/img/';
$servicio = [
    'servicio' => [
        [
            'id' => 1,
            'nombre' => 'Individual Approach',
            'descripcion' => 'Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo',
            'foto' => $ruta . "service-1.jpg"
        ],
        [
            'id' => 2,
            'nombre' => 'Individual Approach',
            'descripcion' => 'Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo',
            'foto' => $ruta . "service-2.jpg"
        ],
        [
            'id' => 3,
            'nombre' => 'Individual Approach',
            'descripcion' => 'Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo',
            'foto' => $ruta . "service-3.jpg"
        ],
        [
            'id' => 4,
            'nombre' => 'Individual Approach',
            'descripcion' => 'Dolor nonumy sed eos sed lorem diam amet eos magna. Dolor kasd lorem duo stet kasd justo',
            'foto' => $ruta . "service-4.jpg"
        ],
    ],
    'clientes' => [
        [
            'id' => 1,
            'nombre' => 'Nombre cliente',
            'descripcion' => 'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
            'profesion' => 'profesion',
            'foto' => $ruta . "testimonial-1.jpg"
        ],
        [
            'id' => 2,
            'nombre' => 'Nombre cliente',
            'descripcion' => 'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
            'profesion' => 'profesion',
            'foto' => $ruta . "testimonial-2.jpg"
        ],
        [
            'id' => 3,
            'nombre' => 'Nombre cliente',
            'descripcion' => 'Dolor eirmod diam stet kasd sed. Aliqu rebum est eos. Rebum elitr dolore et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
            'profesion' => 'profesion',
            'foto' => $ruta . "testimonial-3.jpg"
        ],
    ]
];

// Convierte el arreglo a JSON y lo muestra
header('Content-Type: application/json');
echo json_encode($servicio);
