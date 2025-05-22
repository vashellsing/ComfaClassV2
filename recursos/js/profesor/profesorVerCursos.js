(() => {
  let cursos = [];
  const modalAlumnos  = new bootstrap.Modal(document.getElementById('modal-alumnos'));
  const modalMensaje  = new bootstrap.Modal(document.getElementById('modal-mensaje'));
  const modalConfirm  = new bootstrap.Modal(document.getElementById('modal-confirmar-curso'));

  // — Overrides de alert y confirm usando tus modales Bootstrap —
  window.alert = msg => {
    // inyecta el texto y muestra el modal de mensaje
    document.getElementById('modal-mensaje-body').textContent = msg;
    modalMensaje.show();
  };
  window.confirm = msg => new Promise(resolve => {
    // inyecta el texto y muestra el modal de confirmación
    document.getElementById('modal-confirmar-curso-body').textContent = msg;
    const btnYes = document.getElementById('btn-confirmar-curso');
    const btnNo  = document.querySelector('#modal-confirmar-curso .btn-secondary');

    // limpia listeners previos
    btnYes.onclick = null;
    btnNo.onclick  = null;

    btnYes.onclick = () => { resolve(true);  modalConfirm.hide(); };
    btnNo.onclick  = () => { resolve(false); modalConfirm.hide(); };
    modalConfirm.show();
  });
  // — Fin overrides —

  async function init(){
    await cargarCursos();
    setupListClicks();
  }

  async function cargarCursos() {
    const res  = await fetch("includes/profesor/profesorVerCursos.php");
    const json = await res.json();
    cursos = json.data || [];
    const list = document.getElementById("listacursos");
    list.innerHTML = cursos.length
      ? cursos.map(c => `<li class="list-group-item list-group-item-action" data-id="${c.id_curso}">${c.nombre_curso}</li>`).join('')
      : `<li class="list-group-item">No tienes cursos registrados.</li>`;
  }

  function setupListClicks() {
    document.getElementById("listacursos")
      .addEventListener("click", e => {
        const li = e.target.closest("li[data-id]");
        if (!li) return;
        const curso = cursos.find(c => c.id_curso == li.dataset.id);
        if (curso) showDetalle(curso);
      });
  }

  function showDetalle(c) {
    document.getElementById("curso-detalle").innerHTML = `
      <div class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">${c.nombre_curso}</h5>
          <small class="text-muted">${c.fecha_creacion}</small>
        </div>
        <div class="card-body">
          <p><strong>Materia:</strong> ${c.nombre_materia}</p>
          <p>${c.descripcion_curso || '<em>Sin descripción</em>'}</p>
          <div class="btn-group" role="group">
            <button id="btn-editar"  class="btn btn-sm btn-outline-primary">Editar</button>
            <button id="btn-borrar"  class="btn btn-sm btn-outline-danger">Borrar</button>
            <button id="btn-alumnos" class="btn btn-sm btn-outline-secondary">Alumnos</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("btn-editar").addEventListener("click", () => showEditForm(c));
    document.getElementById("btn-borrar").addEventListener("click", () => borrarCurso(c.id_curso));
    document.getElementById("btn-alumnos").addEventListener("click", () => verAlumnos(c.id_curso));
  }

  function showEditForm(c) {
    const cont = document.getElementById("curso-detalle");
    cont.innerHTML = `
      <div class="card">
        <div class="card-header">Editar curso</div>
        <div class="card-body">
          <form id="form-editar" novalidate>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input 
                type="text" 
                name="nombre_curso" 
                class="form-control" 
                value="${c.nombre_curso}" 
                required 
                maxlength="60"
              >
              <div class="invalid-feedback"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea 
                name="descripcion_curso" 
                class="form-control" 
                maxlength="250"
              >${c.descripcion_curso || ''}</textarea>
              <div class="invalid-feedback"></div>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
            <button type="button" id="btn-cancelar" class="btn btn-secondary btn-sm ms-2">
              Cancelar
            </button>
          </form>
        </div>
      </div>
    `;
    document.getElementById("form-editar").addEventListener("submit", e => saveEdicion(e, c.id_curso));
    document.getElementById("btn-cancelar").addEventListener("click", () => showDetalle(c));
  }

  async function saveEdicion(e, idCurso) {
    e.preventDefault();
    const form   = e.target;
    const nombre = form.nombre_curso.value.trim();
    const desc   = form.descripcion_curso.value.trim();

    if (!nombre) {
      form.nombre_curso.classList.add("is-invalid");
      form.nombre_curso.nextElementSibling.textContent = "Requerido.";
      return;
    }
    form.nombre_curso.classList.remove("is-invalid");

    try {
      const body = new URLSearchParams({ id_curso: idCurso, nombre_curso: nombre, descripcion_curso: desc });
      const res  = await fetch("includes/profesor/profesorEditarCursos.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      alert(json.message);
      await cargarCursos();
      const actualizado = cursos.find(c => c.id_curso == idCurso);
      showDetalle(actualizado);
    } catch (err) {
      console.error("Error guardando edición:", err);
      alert("No se pudo guardar los cambios.");
    }
  }

  async function borrarCurso(idCurso) {
    const ok = await confirm("¿Seguro que deseas borrar este curso?");
    if (!ok) return;
    const res  = await fetch("includes/profesor/profesorBorrarCurso.php", {
      method: "POST",
      headers: {"Content-Type":"application/x-www-form-urlencoded"},
      body: new URLSearchParams({id_curso: idCurso})
    });
    const json = await res.json();
    if (json.success) {
      alert(json.message);
      await cargarCursos();
      document.getElementById("curso-detalle").innerHTML =
        `<div class="alert alert-info">Selecciona un curso para ver detalles.</div>`;
    } else {
      alert("Error: " + json.message);
    }
  }

  async function verAlumnos(idCurso) {
    const res  = await fetch(`includes/profesor/obtenerAlumProfesor.php?curso_id=${idCurso}`);
    const json = await res.json();
    const lista = document.getElementById("lista-alumnos");
    lista.innerHTML = "";

    if (!json.success) {
      lista.innerHTML = `<li class="list-group-item text-danger">${json.message}</li>`;
    } else if (json.data.length === 0) {
      lista.innerHTML = `<li class="list-group-item">No hay alumnos inscritos.</li>`;
    } else {
      lista.innerHTML = json.data.map(a => `
        <li class="list-group-item">
          <strong>${a.nombre} (${a.genero})</strong><br>
          C.C: ${a.identificacion}<br>
          ${a.correo}
        </li>
      `).join('');
    }
    modalAlumnos.show();
  }

  // Arrancar
  init();
})();
