<?php

include_once __DIR__ . "/../conexion.php";

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idCurso = $_POST['id_curso'];
    $nombreCurso = $_POST['nombre_curso'];
    $descripcionCurso = $_POST['descripcion_curso'];

    // Aquí deberías realizar la validación de los datos recibidos

    $sql = "UPDATE cursos SET nombre_curso = ?, descripcion_curso = ? WHERE id_curso = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nombreCurso, $descripcionCurso, $idCurso);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Curso actualizado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el curso: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    // Si alguien intenta acceder a este archivo por GET
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
