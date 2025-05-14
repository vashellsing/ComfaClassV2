<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card shadow-sm">
        <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Mis Cursos Inscritos</h4>
          <button class="btn btn-sm btn-light" onclick="navegarA('estudianteVista')">
            <i class="bi bi-arrow-left me-1"></i>Volver
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover table-striped">
              <thead class="table-light">
                <tr>
                  <th>Nombre del Curso</th>
                  <th>Profesor</th>
                  <th>Descripción</th>
                  <th>Fecha de Inscripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody id="tablaCursosInscritos">
                <!-- Los cursos se cargarán dinámicamente aquí -->
                <tr>
                  <td colspan="5" class="text-center">Cargando tus cursos inscritos...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Modal de confirmación para eliminar curso -->
<div class="modal fade" id="modalConfirmacion" tabindex="-1" aria-labelledby="modalConfirmacionLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="modalConfirmacionLabel">Confirmar eliminación</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
      </div>
    </div>
  </div>
</div>

<!-- Asegúrate de incluir Bootstrap Icons si no lo has hecho ya -->
<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"> -->