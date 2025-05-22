<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<!-- Vista principal del administrador -->

<div class="container my-5">

  <div class="bg-light rounded shadow-sm text-center">
    <!-- Padding responsivo: menos en móvil, más en escritorio -->
    <div class="py-4 py-md-5 px-3 px-md-5">
      <h1 class="display-5 display-md-4 text-info mb-3">
        Panel de Control - Administrador
      </h1>
      <p class="lead text-muted mb-4">
        ¡Bienvenido de nuevo!<br>
        Desde aquí puedes gestionar usuarios.
      </p>

      <div class="row justify-content-center">
        <!-- Columna responsiva para la tarjeta -->
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <div class="card h-100 border-success">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="card-title text-success">Gestionar Usuarios</h5>
                <p class="card-text text-secondary">
                  Revisa, desbloquea o asigna roles a los usuarios registrados.
                </p>
              </div>
              <button type="button" class="btn btn-success mt-3" onclick="navegarA('adminroles')">
                Ir a Usuarios
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-5">
    </div>
  </div>

</div>
