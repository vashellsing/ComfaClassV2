<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <!-- Título y descripción agregados -->
      <div class="mb-3 text-center">
        <h2>Vista del Estudiante</h2>
        <p>Aquí puedes explorar todos los cursos disponibles y acceder al contenido que más te interese.</p>
      </div>

      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0 text-center">Cursos Disponibles</h4>
        </div>
        <div class="card-body">
          <!-- Contenedor donde se inyectarán los cursos -->
          <div class="text-center mt-2">
            <p>
              <a href="#" onclick="navegarA('estudianteVista')">Mostrar Cursos</a>
            </p>
          </div>          
        </div>
      </div>
    </div>
  </div>
</main>
