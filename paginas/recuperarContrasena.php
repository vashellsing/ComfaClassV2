<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0 text-center">Recuperar Contraseña</h4>
          </div>
          <div class="card-body">
            <form id="formRecuperar" novalidate>
              <!-- Campo de correo -->
              <div class="mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="usuario@email.com"
                  required
                />
              </div>
              <!-- Mensaje de error -->
              <div class="mb-3 text-center">
                <small id="mensajeError" class="form-text text-danger" style="display:none;"></small>
              </div>
              <!-- Mensaje de éxito -->
              <div class="mb-3 text-center">
                <small id="mensajeExito" class="form-text text-success" style="display:none;"></small>
              </div>
              <!-- Botón -->
              <button type="submit" class="btn btn-primary w-100">Enviar Codigo</button>
            </form>
  
            <div class="mt-3 text-center">
              <a href="#" onclick="navegarA('iniciarSesion')">Volver a Iniciar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  