<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 2) {
    http_response_code(403);
    echo json_encode(['success'=>false,'data'=>[],'message'=>'Acceso denegado.']);
    exit;
}

$idProfesor = (int) $_SESSION['id_usuario'];
$cursoId     = (int) ($_GET['curso_id'] ?? 0);

if ($cursoId <= 0) {
    echo json_encode(['success'=>false,'data'=>[],'message'=>'Curso inválido.']);
    exit;
}

// Verificar que el curso pertenece al profesor
$stmt = $conn->prepare("
  SELECT 1 FROM cursos 
  WHERE id_curso = ? AND id_usuario = ?
");
$stmt->bind_param("ii", $cursoId, $idProfesor);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows === 0) {
    echo json_encode(['success'=>false,'data'=>[],'message'=>'No autorizado para este curso.']);
    exit;
}
$stmt->close();

// Traer alumnos inscritos
$sql = "
  SELECT
    u.id_usuario,
    CONCAT(u.nombre_usuario,' ',u.apellido_usuario) AS nombre,
    u.correo_usuario AS correo,
    g.nombre_genero AS genero,
    u.identificacion_usuario AS identificacion
  FROM usuarios u
  JOIN generos g           ON u.id_genero = g.id_genero
  JOIN inscripciones i      ON u.id_usuario = i.id_usuario
  WHERE i.id_curso = ?
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $cursoId);
$stmt->execute();
$res = $stmt->get_result();

$alumnos = [];
while ($fila = $res->fetch_assoc()) {
    $alumnos[] = $fila;
}

echo json_encode([
  'success' => true,
  'data'    => $alumnos,
  'message' => ''
]);

$stmt->close();
$conn->close();
