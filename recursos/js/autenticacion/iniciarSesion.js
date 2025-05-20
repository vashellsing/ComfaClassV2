(() => {
  const form = document.getElementById("formLogin");
  const errorBox = document.getElementById("mensajeError");

  if (!form) return console.error("No existe #formLogin");

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    errorBox.style.display = "none";

    const email = form.email.value.trim();
    const password = form.password.value;

    // Validaciones
    if (!email || !password) {
      return showError("Debes llenar todos los campos.");
    }
    if (!/@(gmail\.com|hotmail\.com)$/i.test(email)) {
      return showError("Solo se aceptan correos @gmail.com o @hotmail.com.");
    }

    try {
      const res = await fetch("includes/autenticacion/iniciarSesion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        // Opcional: podrías guardar algo en localStorage aquí
        if (typeof window.cargarHeader === 'function') {
          window.cargarHeader();
        }
        window.navegarA(data.redirect);
      }
      if (data.success) {
        // 1) Obtenemos el modal de la página
        const modalEl = document.getElementById('loginSuccessModal');
        const loginModal = new bootstrap.Modal(modalEl);

        // 2) Lo mostramos
        loginModal.show();

        // 3) Cuando se cierre, redirigimos
        modalEl.addEventListener('hidden.bs.modal', () => {
          window.navegarA(data.redirect);
        }, { once: true });
      }

    } catch (err) {
      console.error(err);
      showError("Error de conexión con el servidor.");
    }
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }
})();

