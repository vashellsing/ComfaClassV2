<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>

<div class="container mt-4">
  <h2 class="mb-4">Administrar usuarios</h2>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Identificación</th>
        <th>Correo</th>
        <th class="text-center">Rol actual</th>
        <th>Nuevo rol</th>
        <th class="text-center">Acción</th>
      </tr>
    </thead>
    <tbody id="cuerpo-tabla-usuarios">
      <!-- Se llenará vía JS -->
    </tbody>
  </table>
</div>

<!-- Modal de confirmación -->
<div 
  class="modal fade" 
  id="modal-confirmar-cambio" 
  tabindex="-1" 
  aria-labelledby="modalLabel" 
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Confirmar cambio de rol</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p id="mensaje-confirmacion"></p>
      </div>
      <div class="modal-footer">
        <button 
          type="button" 
          class="btn btn-secondary" 
          data-bs-dismiss="modal"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          class="btn btn-primary" 
          id="boton-confirmar-cambio"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</div>
