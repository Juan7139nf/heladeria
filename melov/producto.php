<?php
// Permitir cualquier origen (útil para pruebas locales)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$ruta = 'http://localhost/melov/fotos/productos/';
$servicio = [
    [
        'id' => 1,
        'nombre' => '1 kilo de helado',
        'descripcion' => 'Aproximadamente 16 porciones de helado (Sabores a eleccion)',
        'foto' => $ruta . "helado1k.jpg",
        'precio' => 75
    ],
    [
        'id' => 2,
        'nombre' => '1/2 kilo de helado',
        'descripcion' => 'Aproximadamente de 8 porciones de helado (Sabores a eleccion)',
        'foto' => $ruta . "helado1_2k.jpg",
        'precio' => 40
    ],
    [
        'id' => 3,
        'nombre' => '1/4 kilo de helado',
        'descripcion' => 'Aproximadamente 4 porciones de helado (Sabores a eleccion)',
        'foto' => $ruta . "helado1_4k.jpg",
        'precio' => 25
    ],
    [
        'id' => 4,
        'nombre' => 'Ice Cream Soda mini',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), soda (CocaCola ó Fanta 350 ml), crema de leche y cherry ',
        'foto' => $ruta . "ice_cream_soda_mini.jpg",
        'precio' => 22
    ],
    [
        'id' => 5,
        'nombre' => 'Tropical Fruit',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), base ensalada de frutas, rodaja de piña, gelatinas bañadas en coco rallado, cream de leche y cherry',
        'foto' => $ruta . "tropical_fruit.jpg",
        'precio' => 28
    ],
    [
        'id' => 6,
        'nombre' => 'Copa Melov',
        'descripcion' => 'Cuatro porciones de helado (sabores a eleccion, frutas de la temporada, crema de leche,jalea de frutilla, cubanitas bañadas de chocolate, crema de leche, grajeas de chocolate',
        'foto' => $ruta . "copa_mellow.jpg",
        'precio' => 35
    ],
    [
        'id' => 7,
        'nombre' => 'Gus Gus',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), crema de leche, cubanitos, gusanitos de goma, pasas de uva y cherry',
        'foto' => $ruta . "gus_gus.jpg",
        'precio' => 20
    ],
    [
        'id' => 8,
        'nombre' => 'Frozen',
        'descripcion' => 'Dos porciones de helado (sabores a eleccion), crema de leche, galletas oreo, chubis, pasa de uva, cherry y caramelo',
        'foto' => $ruta . "frozen.jpg",
        'precio' => 20
    ],
    [
        'id' => 9,
        'nombre' => 'Piña Colada',
        'descripcion' => 'Batido de helado de coco con ron añejo, media rodaja de piña, crema deleche y cherry mentolado',
        'foto' => $ruta . "piña_colada.jpg",
        'precio' => 30
    ],
    [
        'id' => 10,
        'nombre' => 'Payasito',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), gelatina de colores, cucurucho, crema de leche, duraznos al jugo, media rodaja de piña, chispas de colores, pasas de uva y cherry',
        'foto' => $ruta . "payasito.jpg",
        'precio' => 28
    ],
    [
        'id' => 11,
        'nombre' => 'Malibú',
        'descripcion' => 'Cuatro porciones de helado (sabores a eleccion), frutillas al jugo, 3 frutas de la temporada, jalea de frutilla, crema de leche, cubanito y cherry',
        'foto' => $ruta . "malibú.jpg",
        'precio' => 35
    ],
    [
        'id' => 12,
        'nombre' => 'Vienesa',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), cafe expres, galletas, crema de leche, nueces acarameladas y cherry',
        'foto' => $ruta . "vienesa.jpg",
        'precio' => 25
    ],
    [
        'id' => 13,
        'nombre' => 'Bombon Italiano',
        'descripcion' => 'Cuatro porciones de helado (Sabores a eleccion), galletas oreo, nutulla, jalea de chocolate, crema de leche, grajeas de chocolate',
        'foto' => $ruta . "bombon_italiano.jpg",
        'precio' => 35
    ],
    [
        'id' => 14,
        'nombre' => 'Mickey Mouse',
        'descripcion' => 'Dos porciones de helado (sabores a eleccion), crema de leche, galleta oreo, chubis, pasas de uva, cherry y caramelo',
        'foto' => $ruta . "mickey_mouse.jpg",
        'precio' => 20
    ],
    [
        'id' => 15,
        'nombre' => 'Melovcito',
        'descripcion' => 'Dos porciones de helado (sabores a eleccion), masmelo, crema de leche, salsa de chocolate y ositos de goma',
        'foto' => $ruta . "mellovcito.jpg",
        'precio' => 20
    ],
    [
        'id' => 16,
        'nombre' => 'Colegial',
        'descripcion' => 'Dos porciones de helado (Sabores a eleccion), jalea de chocolate, crema de leche, chispas de chocolate y galletas',
        'foto' => $ruta . "colegial.jpg",
        'precio' => 18
    ],
    [
        'id' => 17,
        'nombre' => 'Melva',
        'descripcion' => 'Tres porciones de helado (Sabores a eleccion), base de gelatina, duraznos al jugo, crema de leche, galleta y cherry',
        'foto' => $ruta . "melva.jpg",
        'precio' => 25
    ],
    [
        'id' => 18,
        'nombre' => 'Caribe',
        'descripcion' => 'Tres porciones de helado (Sabores a eleccion), base de piñas al jugo, jalea de frutilla , crema de leche, cubanito, nueces acarameladas y cherry',
        'foto' => $ruta . "caribe.jpg",
        'precio' => 25
    ],
    [
        'id' => 19,
        'nombre' => 'Banana Split',
        'descripcion' => 'Tres porciones de helado (Sabores a eleccion), base de piñas al jugo, jalea de frutilla, crema de leche, cubanito, nueces acarameladas y cherry',
        'foto' => $ruta . "banana_split.jpg",
        'precio' => 20
    ],
    [
        'id' => 20,
        'nombre' => 'Milk shake',
        'descripcion' => 'Batido de helado (Sabor a eleccion), base de cubitos de durazno al jugo, crema de leche, chispas de colores',
        'foto' => $ruta . "milkshake.jpg",
        'precio' => 22
    ],
    [
        'id' => 21,
        'nombre' => 'Capuccino Frio',
        'descripcion' => 'Batino de helado de vainilla con cafe, crema de leche, jalea de chocolate y chispas de chocalate',
        'foto' => $ruta . "capuccino.jpg",
        'precio' => 15
    ],
    [
        'id' => 22,
        'nombre' => 'Caribe',
        'descripcion' => 'Tres porciones de helado (sabores a eleccion), base de piñas al jugo, jalea de frutilla, rema de leche, cubanito, nueces acarmeladas y cherry',
        'foto' => $ruta . "caribe.jpg",
        'precio' => 25
    ],
];

// Convierte el arreglo a JSON y lo muestra
header('Content-Type: application/json');
echo json_encode($servicio);