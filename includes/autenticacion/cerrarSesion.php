<?php
session_start();
header('Content-Type: application/json');

// Destruir la sesión
$_SESSION = [];
if (ini_get("session.use_cookies")) {
    setcookie(session_name(), '', time() - 3600, '/');
}
session_destroy();

echo json_encode(['success' => true]);

