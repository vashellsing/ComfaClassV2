<?php require_once __DIR__ . "/../includes/checkSAP.php"; ?>
<!-- Formulario para crear cursos -->
<div class="container mt-4">
  <h2>Crear nuevo curso</h2>
  <form id="formcursos" novalidate>
    <!-- Nombre del curso -->
    <div class="mb-3">
      <label for="nombreCurso" class="form-label">Nombre del Curso</label>
      <input
        type="text"
        id="nombreCurso"
        name="nombreCurso"
        class="form-control border border-primary"
        maxlength="60"
        required
      />
      <div class="invalid-feedback"></div>
    </div>

    <!-- Facultad -->
    <div class="mb-3">
      <label for="facultad" class="form-label">Facultad</label>
      <select id="facultad" name="facultad" class="form-select border border-primary" required>
        <option value="">Seleccione una facultad</option>
      </select>
      <div class="invalid-feedback"></div>
    </div>

    <!-- Carrera -->
    <div class="mb-3">
      <label for="carrera" class="form-label">Carrera</label>
      <select id="carrera" name="carrera" class="form-select border border-primary" required>
        <option value="">Seleccione una carrera</option>
      </select>
      <div class="invalid-feedback"></div>
    </div>

    <!-- Materia -->
    <div class="mb-3">
      <label for="materia" class="form-label">Materia</label>
      <select id="materia" name="materia" class="form-select border border-primary" required>
        <option value="">Seleccione una materia</option>
      </select>
      <div class="invalid-feedback"></div>
    </div>

    <!-- Descripción -->
    <div class="mb-3">
      <label for="descripcion" class="form-label">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        class="form-control border border-primary"
        maxlength="250"
      ></textarea>
      <div class="invalid-feedback"></div>
    </div>

    <!-- Botones -->
    <button type="submit" class="btn btn-primary">Crear Curso</button>
    <button type="button" class="btn btn-secondary ms-2" id="cancelarCurso">Limpiar</button>
  </form>
</div>

<!-- Modal genérico para mensajes -->
<div class="modal fade" id="modal-mensaje" tabindex="-1" aria-labelledby="modalMsgLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-primary">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalMsgLabel">Notificación</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center" id="modal-mensaje-body">
        <!-- Se inyecta el texto -->
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>
</div>

<!-- Asegúrate de cargar Bootstrap JS aquí -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.4.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Luego tu JS -->
<script src="js/profesorCrearCursos.js"></script>
