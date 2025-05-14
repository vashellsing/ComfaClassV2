<?php
session_start();
require_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Solo estudiantes
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 3) {
  http_response_code(403);
  echo json_encode(['success'=>false,'message'=>'No autorizado']);
  exit;
}

$idEst    = $_SESSION['id_usuario'];
$idCurso  = intval($_POST['id_curso'] ?? 0);

if (!$idCurso) {
  echo json_encode(['success'=>false,'message'=>'ID de curso inválido.']);
  exit;
}

$stmt = $conn->prepare("
  DELETE FROM inscripciones 
    WHERE id_usuario = ? 
      AND id_curso   = ?
");
$stmt->bind_param("ii", $idEst, $idCurso);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'message' => 'Inscripción anulada correctamente.'
  ]);
} else {
  echo json_encode([
    'success' => false,
    'message' => 'Error al anular: ' . $stmt->error
  ]);
}

$stmt->close();
$conn->close();
