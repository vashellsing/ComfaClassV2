(() => {

    // 1) Esta función espera hasta que el contenedor con ID "lista-disponibles" exista en el HTML
    // Si aún no existe (por ejemplo, si la página tarda en cargar), vuelve a intentarlo cada 100ms
    function waitForContainer() {
      const cont = document.getElementById("lista-disponibles");
      if (!cont) {
        return setTimeout(waitForContainer, 100);
      }

      // Cuando el contenedor ya está listo, se llama a la función init() para cargar los cursos
      init(cont);
    }
  
    // 2) Esta función carga los cursos disponibles desde el servidor y los muestra en el contenedor
    async function init(cont) {
      try {

        // Se hace una solicitud al backend para obtener los cursos disponibles
        const res  = await fetch("includes/estudiante/obtenerCursosDisponibles.php", {
          headers: { "X-Requested-With": "XMLHttpRequest" } // Para indicar que es una petición AJAX
        });
        const { success, data } = await res.json(); // Se convierte la respuesta a JSON
        if (!success) throw new Error("No autorizado"); // Si falla, lanza error
  
        // Si hay cursos, se genera el HTML para mostrarlos. Si no, se muestra un mensaje.
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
            `).join("") // Convierte todos los cursos a tarjetas HTML
          : `<p class="text-center">No hay cursos nuevos disponibles.</p>`;
  
        // 3) Después de mostrar los cursos, se agregan los eventos a los botones "Inscribirse"
        cont.querySelectorAll("button[data-id]")
          .forEach(btn => btn.addEventListener("click", inscribir)); // Cada botón tendrá su función

      } catch (e) {
        // Si hay un error al cargar los cursos, se muestra un mensaje
        cont.innerHTML = `<div class="alert alert-danger">Error al cargar cursos disponibles.</div>`;
        console.error(e);
      }
    }
  
    // 4) Esta función se ejecuta cuando un estudiante hace clic en "Inscribirse"
    async function inscribir(e) {
      const idCurso = e.currentTarget.dataset.id; // Se obtiene el ID del curso desde el botón
      try {
        // Se envía una solicitud al backend para inscribirse al curso
        const res  = await fetch("includes/estudiante/inscribirCurso.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: new URLSearchParams({ id_curso: idCurso }) // Se envía el ID como parámetro
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message); // Si algo sale mal, lanza error
  
        // Si todo salió bien, se muestra un modal de éxito (ventana emergente)
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

        // Se inserta el modal al final del body
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        const bsModal = new bootstrap.Modal(document.getElementById("modal-exito"));
        bsModal.show();

         // Cuando el modal se cierra, se elimina y se vuelve a cargar la lista de cursos
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
  