<?php
session_start();
?>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" onclick="navegarA('inicio')">
      ComfaClass
    </a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto align-items-center">
        <a class="nav-link" href="#" onclick="navegarA('inicio')">Inicio</a>

        <?php if (isset($_SESSION['id_usuario'])): ?>
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center"
               href="#"
               id="userDropdown"
               role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false">
              <?= htmlspecialchars($_SESSION['nombre_usuario']) . ' ' . htmlspecialchars($_SESSION['apellido_usuario']) ?>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a class="dropdown-item" href="#" onclick="navegarA('perfil')">Mi perfil</a></li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button class="dropdown-item text-danger" id="logout-btn">
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        <?php endif; ?>

      </div>
    </div>
  </div>
</nav>
