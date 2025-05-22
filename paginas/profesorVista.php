<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<!-- Vista principal del profesor-->

<div class="container my-5">

    <div class="bg-white p-5 rounded shadow text-center">
      <h1 class="display-5 text-primary">¡Bienvenido, Profesor!</h1>
      <p class="lead text-secondary">
        ¡Qué bueno tenerte de vuelta!<br>
        Sigamos construyendo conocimiento juntos. Tus clases y alumnos te esperan.
      </p>

<!-- Boton de ver cursos -->

      <div class="d-flex justify-content-center gap-3 mt-4">
        <button type="button" class="btn btn-primary btn-lg px-4 d-flex align-items-center" onclick="navegarA('profesorVerCursos')">
          <i class="bi bi-book me-2"></i> Ver Cursos
        </button>

<!-- Boton de ver alumnos -->
 
        <button type="button" class="btn btn-secondary btn-lg px-4 d-flex align-items-center" onclick="navegarA('profesorCrearCursos')">
          <i class="bi bi-plus-circle me-2"></i> Crear Curso
        </button>
      </div>
    </div>


            
