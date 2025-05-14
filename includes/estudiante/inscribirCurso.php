<?php
session_start();
require_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD']!=='POST' ||
    !isset($_SESSION['id_rol']) || $_SESSION['id_rol']!=3) {
  http_response_code(403);
  echo json_encode(['success'=>false,'message'=>'No autorizado']);
  exit;
}

$idEst = $_SESSION['id_usuario'];
$idCurso = intval($_POST['id_curso'] ?? 0);
if (!$idCurso) {
  echo json_encode(['success'=>false,'message'=>'ID de curso inválido']);
  exit;
}

// Evitar doble inscripción
$stmt = $conn->prepare(
  "SELECT 1 FROM inscripciones WHERE id_usuario=? AND id_curso=?"
);
$stmt->bind_param("ii",$idEst,$idCurso);
$stmt->execute();
$stmt->store_result();
if($stmt->num_rows>0){
  echo json_encode(['success'=>false,'message'=>'Ya inscrito']);
  exit;
}
$stmt->close();

// Inserción
$stmt = $conn->prepare(
  "INSERT INTO inscripciones (id_usuario,id_curso,fecha_inscripcion)
   VALUES (?,?,NOW())"
);
$stmt->bind_param("ii",$idEst,$idCurso);
$ok = $stmt->execute();
echo json_encode([
  'success'=>(bool)$ok,
  'message'=>$ok
    ? 'Inscripción exitosa'
    : 'Error al inscribir: '.$stmt->error
]);
$stmt->close();
$conn->close();
