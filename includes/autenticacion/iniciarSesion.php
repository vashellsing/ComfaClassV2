<?php
session_start();
include_once __DIR__ . "/../conexion.php";

header('Content-Type: application/json');

// Leer JSON entrante
$raw = file_get_contents("php://input");
$datos = json_decode($raw, true);

if (!$datos || empty($datos['email']) || empty($datos['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan credenciales."
    ]);
    exit;
}

// Normalizamos el email a minúsculas
$email    = strtolower(trim($datos['email']));
$password = $datos['password'];

// Preparar y ejecutar consulta case‑insensitive
$stmt = $conn->prepare("
    SELECT id_usuario, nombre_usuario, apellido_usuario, contrasena_usuario, id_rol
    FROM usuarios
    WHERE LOWER(correo_usuario) = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    $hash = $user['contrasena_usuario'];
    if (password_verify($password, $hash) || $password === $hash) {
        // Guardar en sesión
        $_SESSION['id_usuario']      = $user['id_usuario'];
        $_SESSION['correo_usuario']  = $email;
        $_SESSION['id_rol']          = $user['id_rol'];
        $_SESSION['nombre_usuario']  = $user['nombre_usuario'];
        $_SESSION['apellido_usuario']= $user['apellido_usuario'];

        // Mapeo de roles a vistas
        $rolesMap = [
            1 => 'invitadoVista',
            2 => 'profesorVista',
            3 => 'estudianteVista',
            4 => 'administradorVista'
        ];
        $redirect = $rolesMap[$user['id_rol']] ?? 'inicio';

        echo json_encode([
            "success"  => true,
            "message"  => "Inicio de sesión exitoso.",
            "redirect" => $redirect
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Credenciales inválidas."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Usuario no encontrado."
    ]);
}

$stmt->close();
$conn->close();
