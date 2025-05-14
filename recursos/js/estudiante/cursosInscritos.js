(() => {
    let modalConfirm, modalMsg;
    let cursoAAnular = null;
  
    function waitForContainer() {
      const cont = document.getElementById("lista-inscritos");
      if (!cont) return setTimeout(waitForContainer, 100);
      // Inicializa ambos modales
      modalConfirm = new bootstrap.Modal(document.getElementById("modal-confirmar-anulacion"));
      modalMsg     = new bootstrap.Modal(document.getElementById("modal-mensaje"));
      init(cont);
    }
  
    function init(container) {
      cargarInscritos(container);
      document
        .getElementById("btn-confirmar-anulacion")
        .addEventListener("click", confirmarAnulacion);
    }
  
    async function cargarInscritos(container) {
      try {
        const res  = await fetch("includes/estudiante/obtenerCursosInscritos.php");
        const { success, data } = await res.json();
        if (!success) throw new Error("No autorizado");
        container.innerHTML = data.length
          ? data.map(c => tarjetaHTML(c)).join("")
          : `<div class="col-12"><p class="text-center">No estás inscrito en ningún curso.</p></div>`;
        // Enlaza evento al botón Anular de cada tarjeta
        container.querySelectorAll(".btn-anular")
          .forEach(btn => btn.addEventListener("click", abrirModalConfirm));
      } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="alert alert-danger">Error al cargar cursos.</div>`;
      }
    }
  
    function tarjetaHTML(c) {
      return `
        <div class="col-md-6" data-curso-id="${c.id_curso}">
          <div class="card shadow-sm h-100 d-flex flex-column">
            <div class="card-body flex-grow-1">
              <h5 class="card-title">${c.nombre_curso}</h5>
              <p class="text-muted mb-2">${c.nombre_materia}</p>
              <p>${c.descripcion_curso || '<em>Sin descripción</em>'}</p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <small class="text-muted">Inscrito el ${c.fecha_inscripcion}</small>
              <button class="btn btn-outline-danger btn-sm btn-anular">Anular</button>
            </div>
          </div>
        </div>`;
    }
  
    function abrirModalConfirm(e) {
      const card = e.currentTarget.closest("[data-curso-id]");
      cursoAAnular = card.dataset.cursoId;
      document.getElementById("modal-confirmar-anulacion-body").textContent =
        "¿Seguro que deseas anular la inscripción a este curso?";
      modalConfirm.show();
    }
  
    async function confirmarAnulacion() {
      modalConfirm.hide();
      try {
        const params = new URLSearchParams({ id_curso: cursoAAnular });
        const res    = await fetch("includes/estudiante/eliminarInscripcion.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString()
        });
        const json   = await res.json();
        if (!json.success) throw new Error(json.message);
        // Quita la tarjeta del DOM
        const card = document.querySelector(`[data-curso-id="${cursoAAnular}"]`);
        card?.remove();
        // Si no quedan más, mensaje de “ninguno”
        if (!document.querySelector("[data-curso-id]")) {
          document.getElementById("lista-inscritos").innerHTML =
            `<div class="col-12"><p class="text-center">No estás inscrito en ningún curso.</p></div>`;
        }
        showMessage(json.message);
      } catch (err) {
        console.error(err);
        showMessage(err.message || "Error al anular.");
      }
    }
  
    function showMessage(msg) {
      document.getElementById("modal-mensaje-body").textContent = msg;
      modalMsg.show();
    }
  
    // Arranca
    waitForContainer();
  })();
  