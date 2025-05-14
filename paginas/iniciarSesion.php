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
            <a href="#" onclick="navegarA('recuperarContrasena')">¿Olvidaste tu contraseña?</a>
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