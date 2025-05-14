<?php
session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// 1) Solo administradores (rol 4)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 4) {
    echo json_encode([
      "success" => false,
      "data"    => [],
      "message" => "No autorizado."
    ]);
    exit;
}

$idAdmin = $_SESSION['id_usuario'];


$sql = "
  SELECT 
    u.id_usuario         AS id,
    u.nombre_usuario     AS nombre,
    u.identificacion_usuario AS identificacion,
    u.correo_usuario     AS correo,
    r.nombre_rol         AS rol_actual
  FROM usuarios u
  JOIN roles r 
    ON u.id_rol = r.id_rol
  WHERE u.id_rol != 4
    AND u.id_usuario != ?
  ORDER BY 
    CASE u.id_rol
      WHEN 1 THEN 0  /* Invitados primero */
      WHEN 2 THEN 1  /* Profesores después */
      WHEN 3 THEN 2  /* Estudiantes al final */
      ELSE 3
    END,
    u.nombre_usuario  /* dentro de cada grupo, orden alfabético */
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idAdmin);
$stmt->execute();
$result = $stmt->get_result();

$usuarios = [];
while ($fila = $result->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode([
    "success" => true,
    "data"    => $usuarios,
    "message" => ""
]);

$stmt->close();
$conn->close();
