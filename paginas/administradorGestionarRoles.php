<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>

<div class="container-fluid mt-4 p-0">
  <!-- Cabecera y botón con padding controlado -->
  <div class="px-3 px-md-4">
    <h2 class="mb-4">Administrar usuarios</h2>

    <button class="btn btn-sm btn-outline-secondary mb-3" onclick="navegarA('administradorVista')">
      Volver
    </button>
  </div>

  <!-- Tabla de carga de usuarios -->
  <div class="table-responsive px-0">
    <table class="table table-striped table-hover table-sm w-100 mb-0">
      <thead class="table-light">
        <tr>
          <th class="text-center">Nombre</th>
          <th class="text-center">Apellido</th>
          <th class="text-center">Identificación</th>
          <th class="text-center">Correo</th>
          <th class="text-center">Rol actual</th>
          <th class="text-center">Nuevo rol</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody id="cuerpo-tabla-usuarios">
        <!-- Se llena por JS -->
      </tbody>
    </table>
  </div>
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
