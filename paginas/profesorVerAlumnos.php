<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<div class="border border-primary p-3 mb-3">
  <p>Lista de tus alumnos.</p>
</div>

<!-- Lista de alumnos -->
<div id="listaAlumnos" class="border border-primary p-3 mb-4">
 
</div>

<!-- Tabla de usuarios -->
<div class="table-responsive border border-primary p-3 mb-5">
  <table class="table table-bordered border-primary table-hover" id="tabla-usuarios">
    <thead class="table-dark text-center">
      <tr class="border border-primary">
        <th class="border border-primary">Género</th>
        <th class="border border-primary">Identificación</th>
        <th class="border border-primary">Nombre</th>
        <th class="border border-primary">Apellido</th>
        <th class="border border-primary">Correo</th>
      </tr>
    </thead>
    <tbody id="cuerpo-tabla-usuarios">
      <!-- Aquí se cargarán los usuarios desde JavaScript -->
    </tbody>
  </table>
</div>
