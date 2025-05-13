(() => {
  // Espera a que exista el formulario y luego arranca
  function waitForForm() {
    const form = document.getElementById("registroForm");
    if (!form) return setTimeout(waitForForm, 100);
    initRegistro();
  }

  // Inicialización: validaciones, toggles y carga de géneros
  function initRegistro() {
    cargarGeneros();
    togglePassword("contrasena", "mostrarContrasena");
    togglePassword("confirmar_contrasena", "mostrarConfirmarContrasena");

    document
      .getElementById("registroForm")
      .addEventListener("submit", async e => {
        e.preventDefault();
        if (!validarFormularioRegistro()) return;
        await enviarRegistro();
      });
  }

  // Cargar géneros al <select>
  async function cargarGeneros() {
    const sel = document.getElementById("genero");
    if (!sel) return;
    try {
      const res  = await fetch("includes/autenticacion/obtenergeneros.php");
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      json.data.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g.id_genero;
        opt.textContent = g.nombre_genero;
        sel.appendChild(opt);
      });
    } catch (err) {
      console.error("Error cargando géneros:", err);
    }
  }

  // Enviar registro
  async function enviarRegistro() {
    const form = document.getElementById("registroForm");
    const fd   = new FormData(form);

    try {
      const res  = await fetch("includes/autenticacion/registro.php", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: fd
      });
      const json = await res.json();

      if (json.success) {
        alert(json.message);
        // Navegar dentro de la SPA, sin recargar
        window.navegarA(json.redirect);
      } else {
        alert("Error: " + json.message);
      }
    } catch (err) {
      console.error("Error en solicitud de registro:", err);
      alert("Hubo un problema de conexión.");
    }
  }

  // ——————————————————————————————————————————
  // Funciones de validación y toggles (sin cambios en lógica)
  // ——————————————————————————————————————————

  function mostrarError(input, mensajeHtml) {
    input.classList.add("is-invalid");
    let next = input.nextElementSibling;
    let ref  = next && next.tagName === "BUTTON" ? next : input;
    let fb   = ref.nextElementSibling;
    if (!fb || !fb.classList.contains("invalid-feedback")) {
      fb = document.createElement("div");
      fb.classList.add("invalid-feedback");
      fb.style.marginTop = "0.25em";
      ref.insertAdjacentElement("afterend", fb);
    }
    fb.innerHTML = mensajeHtml;
  }

  function limpiarError(input) {
    input.classList.remove("is-invalid");
    let next = input.nextElementSibling;
    let fb =
      next && next.classList.contains("invalid-feedback")
        ? next
        : next &&
          next.tagName === "BUTTON" &&
          next.nextElementSibling &&
          next.nextElementSibling.classList.contains("invalid-feedback")
        ? next.nextElementSibling
        : null;
    if (fb) fb.remove();
  }

  function validarNombreApellido(input, nombreCampo) {
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.value.trim())) {
      mostrarError(input, `El campo ${nombreCampo} solo permite letras.`);
      return false;
    }
    limpiarError(input);
    return true;
  }

  function validarIdentificacion(input) {
    if (!/^\d+$/.test(input.value.trim())) {
      mostrarError(input, "Solo se permiten números.");
      return false;
    }
    limpiarError(input);
    return true;
  }

  function validarEmail(input) {
    if (!/^[\w\.-]+@(gmail|hotmail)\.com$/i.test(input.value.trim())) {
      mostrarError(input, "Solo se permiten correos de Gmail o Hotmail.");
      return false;
    }
    limpiarError(input);
    return true;
  }

  function validarContrasena(input) {
    const val = input.value;
    const checks = [
      { test: /.{8,20}/,       label: "8–20 caracteres" },
      { test: /[A-Z]/,         label: "1 mayúscula" },
      { test: /[a-z]/,         label: "1 minúscula" },
      { test: /\d/,            label: "1 número" },
      { test: /[#!?¡."$%&()\-_:;,@]/, label: "1 símbolo especial" }
    ];
    const falt = checks
      .filter(c => !c.test.test(val))
      .map(c => `<li style="list-style:none;">✖ ${c.label}</li>`)
      .join("");
    if (falt) {
      mostrarError(
        input,
        `<p>La contraseña debe incluir:</p><ul style="padding-left:1em; margin:0;">${falt}</ul>`
      );
      return false;
    }
    limpiarError(input);
    return true;
  }

  function validarConfirmacion(input, original) {
    if (input.value !== original.value) {
      mostrarError(input, "Las contraseñas no coinciden.");
      return false;
    }
    limpiarError(input);
    return true;
  }

  function validarFormularioRegistro() {
    let ok = true;
    ok = validarNombreApellido(   document.getElementById("nombre"),    "nombres")   && ok;
    ok = validarNombreApellido(   document.getElementById("apellido"),  "apellidos") && ok;
    ok = validarIdentificacion(    document.getElementById("identificacion"))         && ok;
    ok = validarEmail(             document.getElementById("email"))                  && ok;
    ok = validarContrasena(        document.getElementById("contrasena"))              && ok;
    ok = validarConfirmacion(      document.getElementById("confirmar_contrasena"), document.getElementById("contrasena")) && ok;

    const sel = document.getElementById("genero");
    if (!sel.value) {
      mostrarError(sel, "Seleccione una opción.");
      ok = false;
    } else {
      limpiarError(sel);
    }
    return ok;
  }

  function togglePassword(inputId, btnId) {
    const inp = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!inp || !btn) return;
    btn.addEventListener("click", () => {
      inp.type = inp.type === "password" ? "text" : "password";
      btn.textContent = inp.type === "password" ? "👁️" : "🙈";
    });
  }

  // Arranca
  waitForForm();
})();
