<?php require_once __DIR__ . "/../includes/checkSAP.php"; ?>
<div class="container mt-4">
  <h3>Mis Cursos Inscritos</h3>
  <div id="lista-inscritos" class="row g-4">
    <!-- Aquí inyecta el JS -->
  </div>
</div>

<!-- Confirmación de anulación -->
<div class="modal fade" id="modal-confirmar-anulacion" tabindex="-1" aria-labelledby="modalAnulaLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalAnulaLabel">Confirmar anulación</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p id="modal-confirmar-anulacion-body"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" id="btn-confirmar-anulacion" class="btn btn-danger">Anular inscripción</button>
      </div>
    </div>
  </div>
</div>

<!-- Mensaje genérico (éxito o error) -->
<div class="modal fade" id="modal-mensaje" tabindex="-1" aria-labelledby="modalMsgLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body text-center" id="modal-mensaje-body">
        <!-- Se inyecta el texto -->
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
      </div>
    </div>
  </div>
</div>





