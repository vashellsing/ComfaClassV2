<?php
require_once __DIR__ . "/../includes/checkSAP.php";
?>
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0 text-center">Registro de Usuario</h4>
        </div>
        <div class="card-body">
          <form id="registroForm" method="POST" novalidate>
            <!-- Nombres -->
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombres</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                name="nombre"
                required
                minlength="3"
              />
              <div class="invalid-feedback"></div>
            </div>
            <!-- Apellidos -->
            <div class="mb-3">
              <label for="apellido" class="form-label">Apellidos</label>
              <input
                type="text"
                class="form-control"
                id="apellido"
                name="apellido"
                required
                minlength="3"
              />
              <div class="invalid-feedback"></div>
            </div>
            <!-- Identificación -->
            <div class="mb-3">
              <label for="identificacion" class="form-label"
                >Número de Identificación</label
              >
              <input
                type="text"
                class="form-control"
                id="identificacion"
                name="identificacion"
                required
              />
              <div class="invalid-feedback"></div>
            </div>
            <!-- Correo -->
            <div class="mb-3">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                required
              />
              <div class="invalid-feedback"></div>
            </div>
            <!-- Contraseña -->
            <div class="mb-3">
              <label for="contrasena" class="form-label">Contraseña</label>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  id="contrasena"
                  name="contrasena"
                  required
                  minlength="8"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="mostrarContrasena"
                >
                  👁️
                </button>
              </div>

              <div class="invalid-feedback"></div>
            </div>
            <!-- Confirmar Contraseña -->
            <div class="mb-3">
              <label for="confirmar_contrasena" class="form-label"
                >Confirmar Contraseña</label
              >
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  id="confirmar_contrasena"
                  name="confirmar_contrasena"
                  required
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="mostrarConfirmarContrasena"
                >
                  👁️
                </button>
              </div>
              <div class="invalid-feedback"></div>
            </div>
            <!-- Género -->
            <div class="mb-3">
              <label for="genero" class="form-label">Género</label>
              <select class="form-select" id="genero" name="genero" required>
                <option value="">Seleccione una opción</option>
                <!-- Opciones se pueden llenar dinámicamente -->
              </select>
              <div class="invalid-feedback"></div>
            </div>
            <!-- Botones -->
            <button type="submits" class="btn btn-primary w-100 mb-2">
              Registrarse
            </button>
            <button
              type="button"
              class="btn btn-success w-100"
              onclick="navegarA('iniciarSesion')"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
