<?php
header('Content-Type: application/json');
include_once __DIR__ . "/../conexion.php";

$carrId = intval($_GET['carrera_id'] ?? 0);
if ($carrId <= 0) {
    echo json_encode(["success"=>false,"data"=>[],"message"=>"Carrera inválida."]);
    exit;
}

try {
    $stmt = $conn->prepare("
      SELECT id_materia, nombre_materia
      FROM materias
      WHERE id_carrera = ?
      ORDER BY nombre_materia
    ");
    $stmt->bind_param("i", $carrId);
    $stmt->execute();
    $res = $stmt->get_result();
    $materias = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["success"=>true,"data"=>$materias,"message"=>""]);
} catch (Exception $e) {
    echo json_encode(["success"=>false,"data"=>[],"message"=>"Error al obtener materias: ".$e->getMessage()]);
}
$conn->close();
