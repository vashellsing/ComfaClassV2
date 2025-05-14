<?php require_once __DIR__ . "/../includes/checkSAP.php"; ?>
<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Cursos Disponibles</h3>
    <button class="btn btn-sm btn-outline-secondary" onclick="navegarA('estudianteVista')">
      <i class="bi bi-arrow-left me-1"></i>Volver
    </button>
  </div>
  <div id="lista-disponibles" class="row g-4">
    <!-- Se llenará dinámicamente con JS -->
     
  </div>
</div>