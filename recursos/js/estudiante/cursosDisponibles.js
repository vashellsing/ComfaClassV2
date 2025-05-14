(() => {
    // 1) Espera a que exista el contenedor en el DOM
    function waitForContainer() {
      const cont = document.getElementById("lista-disponibles");
      if (!cont) {
        return setTimeout(waitForContainer, 100);
      }
      init(cont);
    }
  
    // 2) Inicializa la carga de cursos
    async function init(cont) {
      try {
        const res  = await fetch("includes/estudiante/obtenerCursosDisponibles.php", {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        });
        const { success, data } = await res.json();
        if (!success) throw new Error("No autorizado");
  
        cont.innerHTML = data.length
          ? data.map(c => `
              <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${c.nombre_curso}</h5>
                    <p class="text-muted mb-2">${c.nombre_materia}</p>
                    <p class="flex-grow-1">${c.descripcion_curso || '<em>Sin descripción</em>'}</p>
                    <button class="btn btn-primary mt-3" data-id="${c.id_curso}">
                      Inscribirse
                    </button>
                  </div>
                </div>
              </div>
            `).join("")
          : `<p class="text-center">No hay cursos nuevos disponibles.</p>`;
  
        // 3) Agrega listener de inscripción
        cont.querySelectorAll("button[data-id]")
          .forEach(btn => btn.addEventListener("click", inscribir));
      } catch (e) {
        cont.innerHTML = `<div class="alert alert-danger">Error al cargar cursos disponibles.</div>`;
        console.error(e);
      }
    }
  
    // 4) Función para inscribir al curso
    async function inscribir(e) {
      const idCurso = e.currentTarget.dataset.id;
      try {
        const res  = await fetch("includes/estudiante/inscribirCurso.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: new URLSearchParams({ id_curso: idCurso })
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
  
        // Modal de éxito al estilo Bootstrap
        const modalHtml = `
          <div class="modal fade" id="modal-exito" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-success text-white">
                  <h5 class="modal-title">¡Inscripción exitosa!</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  Te has inscrito correctamente.
                </div>
              </div>
            </div>
          </div>`;
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const bsModal = new bootstrap.Modal(document.getElementById("modal-exito"));
        bsModal.show();
        bsModal._element.addEventListener("hidden.bs.modal", () => {
          bsModal.dispose();
          document.getElementById("modal-exito").remove();
          // Recarga la lista para que el curso desaparezca
          init(document.getElementById("lista-disponibles"));
        });
      } catch (err) {
        console.error(err);
        alert("No se pudo completar la inscripción: " + err.message);
      }
    }
  
    // Arranca el bucle de espera
    waitForContainer();
  })();
  