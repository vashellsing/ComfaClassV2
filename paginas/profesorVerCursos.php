<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<!-- paginas/profesorVerCursos.php -->
<div class="container mt-4">
  <div class="row">
    <!-- Lista de cursos -->
    <div class="col-md-4 mb-3">
      <h4>Tus cursos</h4>
      <ul class="list-group" id="listacursos">
        <!-- Items se agregarán dinámicamente -->
      </ul>
    </div>

    <!-- Detalles / edición -->
    <div class="col-md-8" id="curso-detalle">
      <div class="alert alert-info">Selecciona un curso para ver detalles.</div>
    </div>
  </div>
</div>

<!-- ... tu código existente ... -->

<!-- Modal para lista de alumnos -->
<div 
  class="modal fade" 
  id="modal-alumnos" 
  tabindex="-1" 
  aria-labelledby="modalAlumnosLabel" 
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAlumnosLabel">Alumnos inscritos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <ul class="list-group" id="lista-alumnos">
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

