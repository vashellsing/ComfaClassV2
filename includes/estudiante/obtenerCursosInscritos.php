<?php
session_start();
require_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 3) {
  http_response_code(403);
  echo json_encode(['success'=>false,'message'=>'No autorizado']);
  exit;
}

$idEst = $_SESSION['id_usuario'];
$sql = "
  SELECT c.id_curso, c.nombre_curso, c.descripcion_curso, m.nombre_materia, 
         DATE_FORMAT(i.fecha_inscripcion, '%Y-%m-%d') AS fecha_inscripcion
  FROM inscripciones i
  JOIN cursos c      ON i.id_curso = c.id_curso
  JOIN materias m    ON c.id_materia = m.id_materia
  WHERE i.id_usuario = ?
  ORDER BY i.fecha_inscripcion DESC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$idEst);
$stmt->execute();
$res = $stmt->get_result();
$c = [];
while($f = $res->fetch_assoc()) $c[] = $f;

echo json_encode(['success'=>true,'data'=>$c]);
$stmt->close();
$conn->close();
