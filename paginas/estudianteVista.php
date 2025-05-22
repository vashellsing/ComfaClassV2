<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <!-- Título y descripción mejorados -->
      <div class="mb-4 text-center">
        <h2 class="fw-bold">Vista del Estudiante</h2>
        <p class="text-muted">Aquí puedes explorar todos los cursos disponibles y acceder al contenido que más te interese.</p>
      </div>

      <div class="row g-4">
        <!-- Card de Cursos Disponibles -->
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-primary text-white py-3">
              <h5 class="mb-0 text-center">Cursos Disponibles</h5>
            </div>
            <div class="card-body d-flex flex-column align-items-center justify-content-between">
              <p class="text-center mb-4">Explora todos los cursos que puedes tomar</p>
              <button class="btn btn-outline-primary btn-sm px-4" onclick="navegarA('cursosDisponibles')">
                <i class="bi bi-book me-2"></i>Ver cursos
              </button>
            </div>
          </div>
        </div>
        
        <!-- Card de Cursos Inscritos -->
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-success text-white py-3">
              <h5 class="mb-0 text-center">Cursos Inscritos</h5>
            </div>
            <div class="card-body d-flex flex-column align-items-center justify-content-between">
              <p class="text-center mb-4">Accede a los cursos en los que ya estás inscrito</p>
              <button class="btn btn-outline-success btn-sm px-4" onclick="navegarA('cursosInscritos')">
                <i class="bi bi-journal-check me-2"></i>Ver mis cursos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

