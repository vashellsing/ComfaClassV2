(() => {
  // — override de alert() para usar el modal de notificación —
  const modalMensaje = new bootstrap.Modal(document.getElementById('modal-mensaje'));
  window.alert = msg => {
    document.getElementById('modal-mensaje-body').textContent = msg;
    modalMensaje.show();
  };
  // — fin override —

  // 1) Espera al formulario
  function wait() {
    const form = document.getElementById("formcursos");
    if (!form) return setTimeout(wait, 100);
    init();
  }

  // 2) Inicializa listeners y carga facultades
  function init() {
    cargarFacultades();
    document.getElementById("facultad").addEventListener("change", cargarCarreras);
    document.getElementById("carrera").addEventListener("change", cargarMaterias);
    document.getElementById("formcursos")
      .addEventListener("submit", async e => {
        e.preventDefault();
        if (!validarForm()) return;
        await enviarCurso();
      });
    document.getElementById("cancelarCurso")
      .addEventListener("click", resetForm);
  }

  // 3) Carga dinámicamente
  async function cargarFacultades() {
    const sel = document.getElementById("facultad");
    try {
      const res  = await fetch("includes/profesor/obtenerfacultades.php");
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      json.data.forEach(f => sel.add(new Option(f.nombre_facultad, f.id_facultad)));
    } catch (e) { console.error(e); }
  }

  async function cargarCarreras() {
    const facuId = this.value;
    const sel   = document.getElementById("carrera");
    sel.length = 1;
    document.getElementById("materia").length = 1;
    if (!facuId) return;
    try {
      const res  = await fetch(`includes/profesor/obtenerCarreras.php?facultad_id=${facuId}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      json.data.forEach(c => sel.add(new Option(c.nombre_carrera, c.id_carrera)));
    } catch (e) { console.error(e); }
  }

  async function cargarMaterias() {
    const carrId = this.value;
    const sel    = document.getElementById("materia");
    sel.length = 1;
    if (!carrId) return;
    try {
      const res  = await fetch(`includes/profesor/obtenerMaterias.php?carrera_id=${carrId}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      json.data.forEach(m => sel.add(new Option(m.nombre_materia, m.id_materia)));
    } catch (e) { console.error(e); }
  }

  // 4) Validaciones
  function validarForm() {
    let ok = true;
    const campos = [
      { el: "nombreCurso", fn: v => v.trim() !== "", msg: "Requerido." },
      { el: "facultad",    fn: v => v !== "",        msg: "Seleccione facultad." },
      { el: "carrera",     fn: v => v !== "",        msg: "Seleccione carrera." },
      { el: "materia",     fn: v => v !== "",        msg: "Seleccione materia." }
    ];
    campos.forEach(({el,fn,msg}) => {
      const inp = document.getElementById(el);
      if (!fn(inp.value)) { markError(inp, msg); ok = false; }
      else clearError(inp);
    });
    return ok;
  }

  function markError(el, txt) {
    el.classList.add("is-invalid");
    let fb = el.nextElementSibling;
    if (!fb || !fb.classList.contains("invalid-feedback")) {
      fb = document.createElement("div");
      fb.className = "invalid-feedback";
      el.after(fb);
    }
    fb.textContent = txt;
  }
  function clearError(el) {
    el.classList.remove("is-invalid");
    const fb = el.nextElementSibling;
    if (fb && fb.classList.contains("invalid-feedback")) fb.remove();
  }

  // 5) Enviar al backend
  async function enviarCurso() {
    const formData = new FormData(document.getElementById("formcursos"));
    try {
      const res  = await fetch("includes/profesor/profesorCrearCursos.php", {
        method: "POST",
        body: formData
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      // aquí usamos alert(), que ya está sobreescrito para mostrar el modal
      alert(json.message);
      resetForm();
    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
    }
  }

  function resetForm() {
    const form = document.getElementById("formcursos");
    form.reset();
    ["nombreCurso","facultad","carrera","materia","descripcion"]
      .forEach(id => clearError(document.getElementById(id)));
    document.getElementById("carrera").length = 1;
    document.getElementById("materia").length = 1;
  }

  // 6) Arrancar lógica
  wait();
})();
