<?php
require_once __DIR__ . "/../conexion.php";
session_start();

// Verificar si el usuario está autenticado y es estudiante
if (!isset($_SESSION['id_usuario']) || $_SESSION['id_rol'] != 3) {
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

// Verificar si se recibió el ID del curso
if (!isset($_POST['id_curso'])) {
    echo json_encode(['error' => 'ID de curso no proporcionado']);
    exit;
}

$id_estudiante = $_SESSION['id_usuario'];
$id_curso = $_POST['id_curso'];

try {
    $conn = Conexion::conectar();
    
    // Obtener los datos del curso antes de eliminar para devolverlos
    $queryCurso = "SELECT c.id_curso, c.nombre_curso, c.descripcion_curso, 
                  CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS nombre_profesor,
                  m.nombre_materia
                  FROM cursos c
                  INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
                  INNER JOIN materias m ON c.id_materia = m.id_materia
                  WHERE c.id_curso = :id_curso";
    $stmtCurso = $conn->prepare($queryCurso);
    $stmtCurso->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
    $stmtCurso->execute();
    $curso = $stmtCurso->fetch(PDO::FETCH_ASSOC);
    
    // Eliminar la inscripción
    $query = "DELETE FROM inscripciones 
              WHERE id_usuario = :id_estudiante AND id_curso = :id_curso";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_estudiante', $id_estudiante, PDO::PARAM_INT);
    $stmt->bindParam(':id_curso', $id_curso, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Inscripción eliminada correctamente', 'curso' => $curso]);
    } else {
        echo json_encode(['error' => 'No se encontró la inscripción']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al eliminar inscripción: ' . $e->getMessage()]);
}
?>