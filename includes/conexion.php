<?php
$host = "localhost";       // Cambia si es diferente
$user = "root";            // Tu usuario de MySQL
$password = "";            // Tu contraseña de MySQL
$dbname = "comfaclass";    // Nombre de tu base de datos

// Configurar mysqli para que lance excepciones en lugar de warnings
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Intentamos conectar
    $conn = new mysqli($host, $user, $password, $dbname);
   
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    // En caso de fallo, mostramos mensaje y detenemos la ejecución
    echo "Error de conexión: " . $e->getMessage();
    exit;
}
?>
