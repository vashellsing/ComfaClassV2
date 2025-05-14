<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Cursos Disponibles</h4>
          <button class="btn btn-sm btn-light" onclick="navegarA('estudianteVista')">
            <i class="bi bi-arrow-left me-1"></i>Volver
          </button>
        </div>
        <div class="card-body">
          <div class="alert alert-success alert-dismissible fade" role="alert" id="mensajeExito">
            <strong>¡Éxito!</strong> El curso se ha agregado correctamente.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          
          <div class="table-responsive">
            <table class="table table-hover table-striped">
              <thead class="table-light">
                <tr>
                  <th>Nombre del Curso</th>
                  <th>Profesor</th>
                  <th>Descripción</th>
                  <th>Duración</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody id="tablaCursosDisponibles">
                <!-- Los cursos se cargarán dinámicamente aquí -->
                <tr>
                  <td colspan="5" class="text-center">Cargando cursos disponibles...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Asegúrate de incluir Bootstrap Icons si no lo has hecho ya -->
<!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">-->