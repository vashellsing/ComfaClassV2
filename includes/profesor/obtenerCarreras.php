<?php
header('Content-Type: application/json');
include_once __DIR__ . "/../conexion.php";

//
$facuId = intval($_GET['facultad_id'] ?? 0);
if ($facuId <= 0) {
    echo json_encode(["success"=>false,"data"=>[],"message"=>"Facultad inválida."]);
    exit;
}

// Se prepara una consulta SQL para obtener las carreras asociadas a la facultad indicada
try {
    $stmt = $conn->prepare("
      SELECT id_carrera, nombre_carrera
      FROM carreras
      WHERE id_facultad = ?
      ORDER BY nombre_carrera
    ");
    $stmt->bind_param("i", $facuId);
    $stmt->execute();
    $res = $stmt->get_result();
    $carreras = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode(["success"=>true,"data"=>$carreras,"message"=>""]);
} catch (Exception $e) {
    echo json_encode(["success"=>false,"data"=>[],"message"=>"Error al obtener carreras: ".$e->getMessage()]);
}
$conn->close();
