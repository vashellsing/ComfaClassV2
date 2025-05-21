<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<main class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0 text-center">Iniciar Sesión</h4>
        </div>
        <div class="card-body">
          <form id="formLogin" novalidate>
            <!-- Correo -->
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input type="email" class="form-control" id="email" placeholder="usuario@email.com" required />
            </div>
            <!-- Contraseña -->
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password" required />
            </div>
            <!-- Mensaje de error -->
            <div class="mb-3 text-center">
              <small id="mensajeError" class="form-text text-danger" style="display:none;"></small>
            </div>
            <!-- Botón -->
            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
          </form>

          <div class="mt-3 text-center">
            <a href="#" onclick="event.preventDefault(); navegarA('recuperarContrasena');">¿Olvidaste tu contraseña?</a>
          </div>
          <div class="text-center mt-2">

            <p>¿No tienes cuenta?
              <a href="#" onclick="event.preventDefault(); navegarA('registro');">
                Regístrate aquí
              </a>
            </p>

            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- Modal de Éxito de Login -->
<div class="modal fade" id="loginSuccessModal" tabindex="-1" aria-labelledby="loginSuccessLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content shadow-lg border-0">
      <div class="modal-header bg-success text-white border-0">
        <h5 class="modal-title" id="loginSuccessLabel">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
          ¡Éxito!
        </h5>
      </div>
      <div class="modal-body text-center py-4">
        <p class="lead mb-3">Has iniciado sesión correctamente.</p>
        <p>¡Bienvenido/a de nuevo! Ya puedes continuar navegando.</p>
      </div>
      <div class="modal-footer justify-content-center border-0">
        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Continuar</button>
      </div>
    </div>
  </div>
</div>