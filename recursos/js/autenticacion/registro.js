(() => {
  // Variables globales
  //
  let modalElem, modalInstance, modalMensaje;

  // ——————————————————————————————————————————————————
  // FUNCIONES DE INICIALIZACIÓN Y ARRANQUE
  // ——————————————————————————————————————————————————

  //  waitForForm espera en bucle (cada 100ms) hasta que existan en el DOM:

  function waitForForm() {
    const form = document.getElementById("registroForm");
    modalElem = document.getElementById("modalRegistro");

    // Si aun no existen, esperar 100ms y volver a llamar
    if (!form || !modalElem) {
      return setTimeout(waitForForm, 100);
    }

    // Creamos un objeto de bootstrap , para la ventana Modal de exito
    modalInstance = new bootstrap.Modal(modalElem);
    // Elemento donde mostraremos el mensaje dentro del modal
    modalMensaje = document.getElementById("modalRegistroMensaje");

    // Ya tenemos los elementos entonces arranca
    initRegistro();
  }

  // initRegistro
  // Inicialización al cargarse el formulario:

  async function initRegistro() {
    // Cargar opciones de genero
    cargarGeneros();

    //Configura botones para alternar visibilidad de contraseña
    togglePassword("contrasena", "mostrarContrasena");
    togglePassword("confirmar_contrasena", "mostrarConfirmarContrasena");

    //Asignar evento al envio del formulario
    document
      .getElementById("registroForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        // Soolo si la validacion completa del formulario es true, enviamos
        if (!validarFormularioRegistro()) return;
        await enviarRegistro();
      });
  }

  // ——————————————————————————————————————————————————
  // FUNCIONES DE CARGA y ENVIO
  // ——————————————————————————————————————————————————

  //Funcion que carga los generos de la base de datos
  async function cargarGeneros() {
    const sel = document.getElementById("genero");
    if (!sel) return;

    try {
      const res = await fetch("includes/autenticacion/obtenergeneros.php");
      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      // Por cada genero, se crea una opcion del menu desplegable
      json.data.forEach((g) => {
        const opt = document.createElement("option");
        opt.value = g.id_genero;
        opt.textContent = g.nombre_genero;
        sel.appendChild(opt);
      });
    } catch (err) {
      console.error("Error cargando géneros:", err);
    }
  }

  // enviarRegistro

  async function enviarRegistro() {
    const form = document.getElementById("registroForm");
    const fd = new FormData(form);

    try {
      const res = await fetch("includes/autenticacion/registro.php", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: fd,
      });
      const json = await res.json();

      // Muestro mensaje en el modal
      modalMensaje.textContent = json.message;
      modalInstance.show();

      if (json.success) {
        // Al cerrarse el modal, redirijo al usuario
        modalElem.addEventListener(
          "hidden.bs.modal",
          () => {
            window.navegarA(json.redirect);
          },
          { once: true }
        );
      }
    } catch (err) {
      console.error("Error en solicitud de registro:", err);
      modalMensaje.textContent = "Hubo un problema de conexión.";
      modalInstance.show();
    }
  }

  // ——————————————————————————————————————————————————
  // FUNCIONES AUXILIARES PARA MOSTRAR/OCULTAR ERRORES
  // ——————————————————————————————————————————————————

  function mostrarError(input, mensajeHtml) {
    input.classList.add("is-invalid");

    // Si el siguiente elemento es botón, buscamos después de él; sino, después del input.
    let next = input.nextElementSibling;
    let ref = next && next.tagName === "BUTTON" ? next : input;
    let fb =
      ref.nextElementSibling &&
      ref.nextElementSibling.classList.contains("invalid-feedback")
        ? ref.nextElementSibling
        : null;

    if (!fb) {
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
    let fb = null;

    if (next && next.classList.contains("invalid-feedback")) {
      fb = next;
    } else if (
      next &&
      next.tagName === "BUTTON" &&
      next.nextElementSibling &&
      next.nextElementSibling.classList.contains("invalid-feedback")
    ) {
      fb = next.nextElementSibling;
    }

    if (fb) {
      fb.remove();
    }
  }

  // ——————————————————————————————————————————————————
  // FUNCIONES DE VALIDACIÓN DE CAMPOS
  // ——————————————————————————————————————————————————

  //validarCampoVacio

  function validarCampoVacio(input) {
    const val = input.value.trim();
    if (val === "") {
      mostrarError(input, "No se puede dejar este campo vacío.");
      return false;
    }
    limpiarError(input);
    return true;
  }

  //Validacion de los campos nombre y apellido
  function validarNombreApellido(input, nombreCampo) {
    if (!validarCampoVacio(input)) return false;
    const val = input.value.trim();
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(val)) {
      mostrarError(input, `El campo ${nombreCampo} solo permite letras.`);
      return false;
    }

    limpiarError(input);
    return true;
  }

  //Validacion de identificacion
  function validarIdentificacion(input) {
    if (!validarCampoVacio(input)) return false;

    const val = input.value.trim();
    if (!/^\d+$/.test(val)) {
      mostrarError(input, "Solo se permiten números.");
      return false;
    }

    limpiarError(input);
    return true;
  }

  //Validacion de email, solo gmail o hotmail

  function validarEmail(input) {
    if (!validarCampoVacio(input)) return false;

    const val = input.value.trim();
    if (!/^[\w\.-]+@(gmail|hotmail)\.com$/i.test(val)) {
      mostrarError(input, "Solo se permiten correos de Gmail o Hotmail.");
      return false;
    }

    limpiarError(input);
    return true;
  }

  //validacion de contraseña
  function validarContrasena(input) {
    if (!validarCampoVacio(input)) return false;

    const val = input.value;
    const checks = [
      { test: /^.{8,20}$/, label: "8–20 caracteres" },
      { test: /[A-Z]/, label: "1 mayúscula" },
      { test: /[a-z]/, label: "1 minúscula" },
      { test: /\d/, label: "1 número" },
      { test: /[#!?¡."$%&()\-_:;,@]/, label: "1 símbolo especial" },
    ];

    // Recopilar los requisitos faltantes
    const falt = checks
      .filter((c) => !c.test.test(val))
      .map((c) => `<li style="list-style:none;">✖ ${c.label}</li>`)
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

  // validacion de contraseña 2  debe ser igual a la anterior
  function validarConfirmacion(input, original) {
    if (!validarCampoVacio(input)) return false;

    if (input.value !== original.value) {
      mostrarError(input, "Las contraseñas no coinciden.");
      return false;
    }

    limpiarError(input);
    return true;
  }

  // Se revisan que todas las partes del registro retornes un ok o true
  function validarFormularioRegistro() {
    let ok = true;

    ok =validarNombreApellido(document.getElementById("nombre"), "nombres") && ok;
    ok =validarNombreApellido(document.getElementById("apellido"), "apellidos") &&ok;
    ok = validarIdentificacion(document.getElementById("identificacion")) && ok;
    ok = validarEmail(document.getElementById("email")) && ok;
    ok = validarContrasena(document.getElementById("contrasena")) && ok;
    ok =validarConfirmacion(document.getElementById("confirmar_contrasena"),document.getElementById("contrasena")) && ok;

    // Validación del select de género
    const sel = document.getElementById("genero");
    if (!sel.value) {
      mostrarError(sel, "No se puede dejar este campo vacío.");
      ok = false;
    } else {
      limpiarError(sel);
    }

    return ok;
  }

  // ——————————————————————————————————————————————————
  // FUNCIONES DE UTILIDAD ADICIONALES
  // ——————————————————————————————————————————————————

  // Funcion que muestra la conseña o la oculta
  function togglePassword(inputId, btnId) {
    const inp = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!inp || !btn) return;

    btn.addEventListener("click", () => {
      inp.type = inp.type === "password" ? "text" : "password";
      btn.textContent = inp.type === "password" ? "👁️" : "🙈";
    });
  }

  // Llamamos a waitForForm() para iniciar el proceso de detección del formulario y modal.
  waitForForm();
})();
