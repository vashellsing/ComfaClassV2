<?php
session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Verifica Solo profesores (rol 2)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 2) {
    echo json_encode(['success'=>false,'message'=>'No autorizado']);
    exit;
}

// Obtiene el ID del curso de la solicitud POST
 // Obtiene el ID del profesor de la sesión
$idCurso = intval($_POST['id_curso'] ?? 0);
$idProf  = $_SESSION['id_usuario'];

if ($idCurso <= 0) {
    echo json_encode(['success'=>false,'message'=>'ID de curso inválido']);
    exit;
}

//eliminar el curso solo si pertenece al profesor
$stmt = $conn->prepare("
  DELETE FROM cursos 
  WHERE id_curso = ? AND id_usuario = ?
");
$stmt->bind_param("ii", $idCurso, $idProf);

if ($stmt->execute()) {
    echo json_encode(['success'=>true,'message'=>'Curso borrado correctamente.']);
} else {
    echo json_encode(['success'=>false,'message'=>'Error al borrar curso: '.$stmt->error]);
}

 // Cierra la conexión a la base de datos
$stmt->close();
$conn->close();
