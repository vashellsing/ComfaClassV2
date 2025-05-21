<?php
session_start();
include_once __DIR__ . "/../conexion.php";

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);
    exit;
}

// Capturar y sanear datos
$nombre         = trim($_POST["nombre"] ?? '');
$apellido       = trim($_POST["apellido"] ?? '');
$identificacion = trim($_POST["identificacion"] ?? '');
$email          = trim($_POST["email"] ?? '');
$contrasena     = $_POST["contrasena"] ?? '';
$genero         = intval($_POST["genero"] ?? 0);
$rol            = 1; // Invitado por defecto

// Validar campos obligatorios
if (
    $nombre === '' || $apellido === '' || 
    $identificacion === '' || $email === '' || 
    $contrasena === '' || $genero === 0
) {
    echo json_encode([
        "success" => false,
        "message" => "Todos los campos son obligatorios."
    ]);
    exit;
}

// Verificar unicidad de correo
$stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE correo_usuario = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "El correo ya está registrado."
    ]);
    exit;
}
$stmt->close();

// Verificar unicidad de identificación
$stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE identificacion_usuario = ?");
$stmt->bind_param("s", $identificacion);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Ese número de identificación ya está registrado."
    ]);
    exit;
}
$stmt->close();

// Hashear contraseña
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO usuarios 
      (nombre_usuario, apellido_usuario, identificacion_usuario, correo_usuario, contrasena_usuario, id_genero, id_rol) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("ssisssi", $nombre, $apellido, $identificacion, $email, $hash, $genero, $rol);

if ($stmt->execute()) {
    echo json_encode([
        "success"  => true,
        "message"  => "Registro exitoso. Por favor, inicia sesión.",
        
        // ruta SPA a la que navegaremos con window.navegarA()
        "redirect" => "iniciarSesion"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
