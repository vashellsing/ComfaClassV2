(() => {
    // Aqui se guarda los modales (ventanas emergentes)
    let modalConfirm, modalMsg;
    // Aqui se guarda el ID del curso que el usuario quiere anular
    let cursoAAnular = null;
  
    // Esta funcion espera hasta que el contenedor con los cursos esté disponible en el HTML
    function waitForContainer() {
      const cont = document.getElementById("lista-inscritos");

      // Si aún no existe el contenedor, vuelve a intentar después de 100 milisegundos
      if (!cont) return setTimeout(waitForContainer, 100);

      // Inicializa ambos modales
      // Una vez que el contenedor existe, se cargan los modales
      modalConfirm = new bootstrap.Modal(document.getElementById("modal-confirmar-anulacion"));
      modalMsg     = new bootstrap.Modal(document.getElementById("modal-mensaje"));

      // Se llama a la funcion principal
      init(cont);
    }
  
    // Esta funcion inicializa todo lo necesario para cargar los cursos inscritos y activa los botones
    function init(container) {
      cargarInscritos(container);//Trae y muestras los cursos del backed

      // Cuando se hace clic en el boton de comfirmar anulacion, se llama a la funcion correspondiente
      document
        .getElementById("btn-confirmar-anulacion")
        .addEventListener("click", confirmarAnulacion);
    }
  
    // En esta funcion se cargan los cursos desde el servidor y los muestra en pantalla
    async function cargarInscritos(container) {
      try {

        // Hace una peticion al servidor para obtener los cursos inscritos inscritos
        const res  = await fetch("includes/estudiante/obtenerCursosInscritos.php");
        const { success, data } = await res.json();

        // En caso de que no se pueda acceder a los cursos, se muestra un mensaje de error
        if (!success) throw new Error("No autorizado");

        // Si hay cursos, se crean las tarjetas; si no, se muestra un mensaje
        container.innerHTML = data.length
          ? data.map(c => tarjetaHTML(c)).join("")
          : `<div class="col-12"><p class="text-center">No estás inscrito en ningún curso.</p></div>`;


        // A cada botón "Anular" se le agrega el evento para mostrar el modal
        container.querySelectorAll(".btn-anular")
          .forEach(btn => btn.addEventListener("click", abrirModalConfirm));
      } catch (err) {
        console.error(err);

        //Si hay un error, se muestra un mensaje de error
        container.innerHTML = `<div class="alert alert-danger">Error al cargar cursos.</div>`;
      }
    }
  
    // Esta funcion crea el HTML para cada tarjeta de curso inscrito
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
  
    // Esta funcion abre el modal de confirmacion para anular la inscripcion y guarda el ID del curso que va a ser anulado
    function abrirModalConfirm(e) {
      const card = e.currentTarget.closest("[data-curso-id]");
      cursoAAnular = card.dataset.cursoId;

      // Muestra el modal de confirmación
      document.getElementById("modal-confirmar-anulacion-body").textContent =
        "¿Seguro que deseas anular la inscripción a este curso?";

        // Se muestra el modal
      modalConfirm.show();
    }
  
    // Esta función se ejecuta cuando el usuario confirma que quiere anular el curso
    async function confirmarAnulacion() {
      modalConfirm.hide(); // Oculta el modal de confirmación

      try {
        // Prepara los datos para enviar al servidor (ID del curso a anular)
        const params = new URLSearchParams({ id_curso: cursoAAnular });

        // Hace una petición al servidor para anular la inscripción
        const res    = await fetch("includes/estudiante/eliminarInscripcion.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString()
        });

        const json   = await res.json();

        // Si la respuesta no es exitosa, lanza un error
        if (!json.success) throw new Error(json.message);
        // Elmina la tarjeta del curso anulado de la vista
        const card = document.querySelector(`[data-curso-id="${cursoAAnular}"]`);
        card?.remove();

        // Si ya no hay cursos inscritos, muestra un mensaje
        if (!document.querySelector("[data-curso-id]")) {
          document.getElementById("lista-inscritos").innerHTML =
            `<div class="col-12"><p class="text-center">No estás inscrito en ningún curso.</p></div>`;
        }
        // Muestra un mensaje de éxito
        showMessage(json.message);
      } catch (err) {
        console.error(err);
        // Si hay un error, muestra un mensaje de error
        showMessage(err.message || "Error al anular.");
      }
    }
    
    // Esta función muestra un mensaje en el modal de mensajes
    function showMessage(msg) {
      document.getElementById("modal-mensaje-body").textContent = msg;
      modalMsg.show(); // Muestra el modal de mensajes
    }
  
    // Al cargar el script, espera a que el contenedor esté disponible
    waitForContainer();
  })();
  