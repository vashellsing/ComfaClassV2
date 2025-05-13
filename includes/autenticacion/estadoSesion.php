<?php
session_start();
header('Content-Type: application/json');

// Si no hay sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode([
        'loggedIn' => false,
    ]);
    exit;
}

// Mapear rol → ruta SPA
$map = [
    1 => 'invitadoVista',
    2 => 'profesorVista',
    3 => 'estudianteVista',
    4 => 'administradorVista',
];

$ruta = $map[$_SESSION['id_rol']] ?? 'home';

echo json_encode([
    'loggedIn' => true,
    'redirect'=> $ruta
]);
