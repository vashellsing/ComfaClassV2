(() => {
   // Obtener referencia al formulario y al contenedor de error
  const form = document.getElementById("formLogin");
  const errorBox = document.getElementById("mensajeError");

  // Verificar que el formulario exista antes de continuar
  if (!form) return console.error("No existe #formLogin");

    // Escuchar el evento de envío del formulario
  form.addEventListener("submit", async ev => {
    ev.preventDefault();                       // Evitar el envío tradicional
    errorBox.style.display = "none";         // Ocultar cualquier mensaje de error previo

    // Leer y limpiar los valores de los campos
    const email = form.email.value.trim();    
    const password = form.password.value;

    // Validar que ambos campos no estén vacíos
    if (!email || !password) {
      return showError("Debes llenar todos los campos.");
    }
    // Validar formato de correo (solo Gmail o Hotmail)
    if (!/@(gmail\.com|hotmail\.com)$/i.test(email)) {
      return showError("Solo se aceptan correos @gmail.com o @hotmail.com.");
    }

    try {
      // Enviar petición al servidor con método POST y JSON
      const res = await fetch("includes/autenticacion/iniciarSesion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();           // Parsear la respuesta JSON

      // Si la autenticación fue exitosa
      if (data.success) {
        // Llamada opcional para recargar cabecera si existe
        if (typeof window.cargarHeader === 'function') {
          window.cargarHeader();
        }
        window.navegarA(data.redirect);        // Redirigir inmediatamente
      }

      // Mostrar modal de éxito antes de redirigir
      if (data.success) {
        // Obtener el elemento modal de la página
        const modalEl = document.getElementById('loginSuccessModal');
        const loginModal = new bootstrap.Modal(modalEl);

        loginModal.show();                     // Mostrar modal

        // Al cerrar el modal, redirigir una vez
        modalEl.addEventListener('hidden.bs.modal', () => {
          window.navegarA(data.redirect);
        }, { once: true });
      } else {
        // Mostrar mensaje de error del servidor
        showError(data.message);
      }

    } catch (err) {
      console.error(err);                     // Log de error en consola
      showError("Error de conexión con el servidor."); // Mensaje genérico al usuario
    }
  });

  // Función para mostrar errores en pantalla
  function showError(msg) {
    errorBox.textContent = msg;               // Insertar mensaje
    errorBox.style.display = "block";       // Hacer visible el contenedor
  }
})();
