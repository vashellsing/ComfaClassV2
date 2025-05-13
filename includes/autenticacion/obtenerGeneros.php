<?php
header('Content-Type: application/json');
include_once __DIR__ . "/../conexion.php";

try {
    // Usando mysqli:
    $result = $conn->query("SELECT id_genero, nombre_genero FROM generos ORDER BY nombre_genero");
    $generos = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode([
        "success" => true,
        "data"    => $generos,
        "message" => ""
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "data"    => [],
        "message" => "Error al obtener géneros: " . $e->getMessage()
    ]);
}
