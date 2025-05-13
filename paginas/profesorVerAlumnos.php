
<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
  <div>
        <p> lista de tus alumnos.</p>
        </div>

<!-- lista de alumnos      <h2>Lista de Alumnos registrados</h2>--> 

<div id="listaAlumnos"></div>

    <!-- Tabla de usuarios -->
    <div class="table-responsive mb-5">
        <table class="table table-bordered table-hover" id="tabla-usuarios">
          <thead class="table-dark text-center">
            <tr>
              <th>Genero</th>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody id="cuerpo-tabla-usuarios">
            <!-- Aquí se cargarán los usuarios desde JavaScript -->
          </tbody>
        </table>
      </div>


    <!-- <script src="../recursos/js/ProfesorVerAlumnos.js"></script> -->