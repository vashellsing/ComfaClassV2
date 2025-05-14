<?php
session_start();
require_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Solo estudiantes (rol 3)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 3) {
  http_response_code(403);
  echo json_encode(['success'=>false,'message'=>'No autorizado']);
  exit;
}

$idEst = $_SESSION['id_usuario'];
$sql = "
  SELECT 
    c.id_curso,
    c.nombre_curso,
    c.descripcion_curso,
    m.nombre_materia
  FROM cursos c
  JOIN materias m ON c.id_materia = m.id_materia
  WHERE c.id_curso NOT IN (
    SELECT id_curso FROM inscripciones WHERE id_usuario = ?
  )
  ORDER BY c.fechacreacion_curso DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idEst);
$stmt->execute();
$res = $stmt->get_result();

$cursos = [];
while($fila = $res->fetch_assoc()) {
  $cursos[] = $fila;
}

echo json_encode(['success'=>true,'data'=>$cursos]);
$stmt->close();
$conn->close();
