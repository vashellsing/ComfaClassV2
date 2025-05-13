(() => {
  let usuarios = [];
  let usuarioSeleccionado = null;
  let nuevoRol = null;
  const modal = new bootstrap.Modal(document.getElementById('modal-confirmar-cambio'));

  // 1) Al cargar la vista, arrancamos
  function init() {
    if (!document.getElementById("cuerpo-tabla-usuarios")) {
      return setTimeout(init, 100);
    }
    cargarUsuarios();
    document
      .getElementById("boton-confirmar-cambio")
      .addEventListener("click", confirmarCambio);
  }

  // 2) Traer lista de usuarios
  async function cargarUsuarios() {
    try {
      const res  = await fetch("includes/administrador/administradorVista.php");
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      usuarios = json.data;
      mostrarUsuarios(usuarios);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
      alert("No se pudo cargar la lista de usuarios.");
    }
  }

  // 3) Pintar la tabla con un <select> y botón por fila
  function mostrarUsuarios(lista) {
    const cuerpo = document.getElementById("cuerpo-tabla-usuarios");
    cuerpo.innerHTML = "";

    lista.forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.nombre}</td>
        <td>${u.identificacion}</td>
        <td>${u.correo}</td>
        <td class="text-center">${u.rol_actual}</td>
        <td>
          <select 
            id="select-${u.id}" 
            class="form-select form-select-sm" 
            data-id="${u.id}"
          >
            <option value="2" ${u.rol_actual === 'Profesor'   ? 'selected' : ''}>
              Profesor
            </option>
            <option value="3" ${u.rol_actual === 'Estudiante' ? 'selected' : ''}>
              Estudiante
            </option>
          </select>
        </td>
        <td class="text-center">
          <button 
            class="btn btn-primary btn-sm btn-cambiar-rol" 
            data-id="${u.id}" 
            data-nombre="${u.nombre}"
          >
            Cambiar
          </button>
        </td>
      `;
      cuerpo.appendChild(tr);
    });

    // 4) Agregar eventos a cada botón
    document.querySelectorAll(".btn-cambiar-rol")
      .forEach(btn => btn.addEventListener("click", abrirModal));
  }

  // 5) Abrir modal y preparar datos
  function abrirModal(e) {
    const btn  = e.currentTarget;
    usuarioSeleccionado     = btn.dataset.id;
    const selectEl          = document.getElementById(`select-${usuarioSeleccionado}`);
    nuevoRol               = selectEl.value;
    const textoRol         = selectEl.selectedOptions[0].text;
    const nombreUsuario    = btn.dataset.nombre;

    document.getElementById("mensaje-confirmacion").innerText =
      `Vas a asignar el rol "${textoRol}" a ${nombreUsuario}. ¿Confirmas?`;
    modal.show();
  }

  // 6) Al confirmar, llamamos al endpoint de cambio de rol
  async function confirmarCambio() {
    try {
      const res  = await fetch("includes/administrador/administradorCambiarRol.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(usuarioSeleccionado),
          nuevo_rol: parseInt(nuevoRol)
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      modal.hide();
      cargarUsuarios();  // refresca la tabla
    } catch (err) {
      console.error("Error cambiando rol:", err);
      alert("No se pudo cambiar el rol.");
    }
  }

  // Arrancamos cuando el DOM y el fragmento HTML estén listos
  init();
})();
