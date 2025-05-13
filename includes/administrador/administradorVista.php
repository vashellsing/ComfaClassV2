<?php
session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Solo administradores (rol 4)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 4) {
    echo json_encode([
      "success" => false,
      "data"    => [],
      "message" => "No autorizado."
    ]);
    exit;
}

// Obtener usuarios con su rol actual
$sql = "
  SELECT 
    u.id_usuario         AS id,
    u.nombre_usuario     AS nombre,
    u.identificacion_usuario AS identificacion,
    u.correo_usuario     AS correo,
    r.nombre_rol         AS rol_actual
  FROM usuarios u
  JOIN roles r ON u.id_rol = r.id_rol
";
$result = $conn->query($sql);

$usuarios = [];
while ($fila = $result->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode([
    "success" => true,
    "data"    => $usuarios,
    "message" => ""
]);

$conn->close();
