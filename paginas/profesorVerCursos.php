<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<!-- paginas/profesorVerCursos.php -->
<div class="container mt-5">
  <div class="row">
    <!-- Lista de cursos -->
    <div class="col-md-4 mb-4">
      <div class="card border-primary shadow-sm">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Tus cursos</h5>
        </div>
        <ul class="list-group list-group-flush" id="listacursos">
          <!-- Items se agregarán dinámicamente -->
        </ul>
      </div>
    </div>

    <!-- Detalles / edición -->
    <div class="col-md-8">
      <div class="card border-primary shadow-sm" id="curso-detalle">
        <div class="card-body">
          <div class="alert alert-info border border-primary mb-0">
            Selecciona un curso para ver detalles.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Lista de alumnos -->
<div 
  class="modal fade" 
  id="modal-alumnos" 
  tabindex="-1" 
  aria-labelledby="modalAlumnosLabel" 
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content border-primary shadow">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalAlumnosLabel">Alumnos inscritos</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group border border-primary" id="lista-alumnos">
          <!-- Se llenará dinámicamente -->
        </ul>
      </div>
      <div class="modal-footer">
        <button 
          type="button" 
          class="btn btn-secondary" 
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</div>
