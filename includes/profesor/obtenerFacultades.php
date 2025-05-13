<?php
header('Content-Type: application/json');
include_once __DIR__ . "/../conexion.php";

try {
    $res       = $conn->query("SELECT id_facultad, nombre_facultad FROM facultades ORDER BY nombre_facultad");
    $facultades = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
      "success" => true,
      "data"    => $facultades,
      "message" => ""
    ]);
} catch (Exception $e) {
    echo json_encode([
      "success" => false,
      "data"    => [],
      "message" => "Error al obtener facultades: " . $e->getMessage()
    ]);
}
$conn->close();
