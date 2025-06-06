<?php
session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Verificar que sea profesor
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 2) {
    echo json_encode([
        "success" => false,
        "data"    => [],
        "message" => "No autorizado."
    ]);
    exit;
}

// Obtener el ID del profesor desde la sesión
$idProfesor = $_SESSION['id_usuario'];

//consulta SQL para obtener los cursos del profesor
$sql = "
  SELECT 
    c.id_curso,
    m.nombre_materia,
    c.nombre_curso,
    c.descripcion_curso,
    DATE_FORMAT(c.fechacreacion_curso, '%Y-%m-%d') AS fecha_creacion
  FROM cursos c
  JOIN materias m ON c.id_materia = m.id_materia
  WHERE c.id_usuario = ?
  ORDER BY c.fechacreacion_curso DESC
";

// Prepara la consulta SQL y se ejecuta
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idProfesor);
$stmt->execute();
$res = $stmt->get_result();

// Verifica si se obtuvieron resultados
$cursos = [];
while ($fila = $res->fetch_assoc()) {
    $cursos[] = $fila;
}

echo json_encode([
    "success" => true,
    "data"    => $cursos,
    "message" => ""
]);

$stmt->close();
$conn->close();
