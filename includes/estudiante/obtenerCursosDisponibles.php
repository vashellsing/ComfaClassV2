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
    // Asumiendo que conexion.php define una variable $conn
    $conn = $GLOBALS['conn']; // O como sea que se acceda a la conexión en tu sistema
    
    // Consulta para obtener cursos disponibles (que el estudiante no haya inscrito)
    $sql = "SELECT c.id_curso, c.nombre_curso, c.descripcion_curso, 
            CONCAT(u.nombre_usuario, ' ', u.apellido_usuario) AS nombre_profesor,
            m.nombre_materia
            FROM cursos c
            INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
            INNER JOIN materias m ON c.id_materia = m.id_materia
            WHERE c.id_curso NOT IN (
                SELECT id_curso FROM inscripciones WHERE id_usuario = ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_estudiante);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $cursos = [];
    while ($row = $result->fetch_assoc()) {
        $cursos[] = $row;
    }
    
    echo json_encode(['cursos' => $cursos]);
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al obtener los cursos: ' . $e->getMessage()]);
}
?>