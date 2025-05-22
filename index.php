<?php
session_start(); // Si luego necesitas gestionar sesiones en tu app
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>COMFACLASS</title>
  <link rel="stylesheet" href="recursos/css/bootstrap.min.css" />
  <link rel="stylesheet" href="recursos/css/style.css" />
</head>
<body>

  <!-- Header -->

  <header id="header"></header>

  <div class="container mt-5">
    <div class="row">
      <!-- Main donde se inyectan las vistas -->
      <main class="col-12 px-0" id="main">
        
      </main>
    </div>
  </div>

  <!-- Footer  -->
  <footer id="footer"></footer>

  <!--Bootstrap -->
  <script src="recursos/js/bootstrap.bundle.min.js"></script>
  <!-- enrutamiento SPA -->
  <script src="recursos/js/main.js"></script>

</body>
</html>
