<?php
// Inicia o reanuda sesión
session_start();

// Conexión a la base de datos
include_once __DIR__ . "/../conexion.php";

// Devolver JSON
header('Content-Type: application/json');

// 1) Leer y decodificar payload JSON
$raw   = file_get_contents("php://input");
$datos = json_decode($raw, true);

// 2) Validar que vengan email y password
if (!$datos || empty($datos['email']) || empty($datos['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan credenciales."
    ]);
    exit;
}

// 3) Normalizar email y obtener contraseña
$email    = strtolower(trim($datos['email']));
$password = $datos['password'];

// 4) Preparar consulta para buscar usuario (case-insensitive)
$stmt = $conn->prepare("
    SELECT 
        id_usuario,
        nombre_usuario,
        apellido_usuario,
        contrasena_usuario,
        id_rol
    FROM usuarios
    WHERE LOWER(correo_usuario) = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// 5) Si el usuario existe, verificar contraseña
if ($user = $result->fetch_assoc()) {
    $hash = $user['contrasena_usuario'];

    // 5a) Comparar contra hash o texto plano
    if (password_verify($password, $hash) || $password === $hash) {
        // 6) Guardar datos útiles en $_SESSION
        $_SESSION['id_usuario']       = $user['id_usuario'];
        $_SESSION['correo_usuario']   = $email;
        $_SESSION['id_rol']           = $user['id_rol'];
        $_SESSION['nombre_usuario']   = $user['nombre_usuario'];
        $_SESSION['apellido_usuario'] = $user['apellido_usuario'];

        // 7) Mapear rol a página de destino
        $rolesMap = [
            1 => 'invitadoVista',
            2 => 'profesorVista',
            3 => 'estudianteVista',
            4 => 'administradorVista'
        ];
        $redirect = $rolesMap[$user['id_rol']] ?? 'inicio';

        // 8) Respuesta exitosa
        echo json_encode([
            "success"  => true,
            "message"  => "Inicio de sesión exitoso.",
            "redirect" => $redirect
        ]);
    } else {
        // 5b) User found but password mismatch
        echo json_encode([
            "success" => false,
            "message" => "Correo o contraseña inválidos."
        ]);
    }
} else {
    // 5c) Usuario no existe
    echo json_encode([
        "success" => false,
        "message" => "Usuario no existe."
    ]);
}

// 9) Cerrar recursos
$stmt->close();
$conn->close();
