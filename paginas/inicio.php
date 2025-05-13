<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<div id="view-home" class="pt-4">
  <div class="text-center mb-5">
    <h1>Bienvenido a <strong>ComfaClass</strong></h1>
    <p class="text-muted">
      Solución integral para la educación: gestiona cursos, tareas,
      calificaciones, comentarios y mucho más.
    </p>
  </div>
  <div class="row justify-content-center g-4">
    <div class="col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Regístrate</h5>
          <p class="card-text flex-grow-1">
            Únete gratis y comienza a gestionar tus clases y
            estudiantes.
          </p>
          <button
            class="btn btn-success mt-3"
            onclick="navegarA('registro')"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Inicia sesión</h5>
          <p class="card-text flex-grow-1">
            Accede a tu panel y continúa con tus cursos y actividades.
          </p>
          <button
            class="btn btn-primary mt-3"
            onclick="navegarA('iniciarSesion')"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
