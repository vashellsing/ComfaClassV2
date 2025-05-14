<?php
require_once __DIR__ . "/../conexion.php";
session_start();

// Verificar si el usuario está autenticado y es estudiante
if (!isset($_SESSION['id_usuario']) || $_SESSION['id_rol'] != 3) {
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$id_estudiante = $_SESSION['id_usuario'];

try {
    $conn = Conexion::conectar();
    
    // Consulta para obtener cursos inscritos por el estudiante
    $query = "SELECT c.id_curso, c.nombre_curso, c.descripcion_curso, 
              CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS nombre_profesor,
              m.nombre_materia, i.fecha_inscripcion
              FROM inscripciones i
              INNER JOIN cursos c ON i.id_curso = c.id_curso
              INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
              INNER JOIN materias m ON c.id_materia = m.id_materia
              WHERE i.id_usuario = :id_estudiante";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id_estudiante', $id_estudiante, PDO::PARAM_INT);
    $stmt->execute();
    
    $cursos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['cursos' => $cursos]);
    
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al obtener los cursos: ' . $e->getMessage()]);
}
?>