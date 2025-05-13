<?php
session_start();
include_once __DIR__ . "/../conexion.php";
header('Content-Type: application/json');

// Verificar que sea profesor (rol = 2)
if (!isset($_SESSION['id_rol']) || $_SESSION['id_rol'] != 2) {
    echo json_encode(["success"=>false,"message"=>"No autorizado."]);
    exit;
}

// Capturar POST
$idUsuario   = $_SESSION['id_usuario'];
$nombreCurso = trim($_POST['nombreCurso']   ?? '');
$facultadId  = intval($_POST['facultad']    ?? 0);
$carreraId   = intval($_POST['carrera']     ?? 0);
$materiaId   = intval($_POST['materia']     ?? 0);
$descripcion = trim($_POST['descripcion']   ?? '');

// Validar
if ($nombreCurso=='' || !$facultadId|| !$carreraId|| !$materiaId) {
    echo json_encode([
      "success"=>false,
      "message"=>"Todos los campos obligatorios deben llenarse."
    ]);
    exit;
}

// Insertar
try {
    $stmt = $conn->prepare("
      INSERT INTO cursos
        (id_usuario, id_materia, nombre_curso, descripcion_curso, fechacreacion_curso)
      VALUES (?,?,?,?,NOW())
    ");
    $stmt->bind_param(
      "iiss",
      $idUsuario,
      $materiaId,
      $nombreCurso,
      $descripcion,

    );
    $ok = $stmt->execute();
    echo json_encode([
      "success" => (bool)$ok,
      "message" => $ok
        ? "Curso creado exitosamente."
        : "Error al crear curso: " . $stmt->error
    ]);
} catch (Exception $e) {
    echo json_encode(["success"=>false,"message"=>"Error en servidor: {$e->getMessage()}"]);
}

$conn->close();
