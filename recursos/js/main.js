document.addEventListener("DOMContentLoaded", () => {

  // ─── 1. MAPA DE RUTAS ─────────────────────────────────────────────────────────
  const rutas = {
    inicio:              { view: "paginas/inicio.php",              script: null },
    iniciarSesion:       { view: "paginas/iniciarSesion.php",       script: "autenticacion/iniciarSesion.js" },
    registro:            { view: "paginas/registro.php",            script: "autenticacion/registro.js" },
    administradorVista:  { view: "paginas/administradorVista.php",  script: "administrador/administradorVista.js" },
    invitadoVista:       { view: "paginas/invitadoVista.php",       script: null },
    profesorVista:       { view: "paginas/profesorVista.php",       script: null },
    profesorCrearCursos: { view: "paginas/profesorCrearCursos.php", script: "profesor/profesorCrearCursos.js" },
    profesorVerCursos:   { view: "paginas/profesorVerCursos.php",   script: "profesor/profesorVerCursos.js" },
    estudianteVista:     { view: "paginas/estudianteVista.php",     script: "estudiante/estudianteVista.js" },
    cursosDisponibles:   { view: "paginas/cursosDisponibles.php",   script: "estudiante/cursosDisponibles.js" },
    cursosInscritos:     { view: "paginas/cursosInscritos.php",     script: "estudiante/cursosInscritos.js" },

  };

  // ─── 2. RUTAS PÚBLICAS ────────────────────────────────────────────────────────
  // Sólo accesibles sin sesión: si hay sesión activa, redirigen al dashboard.
  const rutasPublicas = new Set([
    "inicio",
    "iniciarSesion",
    "registro"
  ]);

  // ─── 3. CARGADORES DE COMPONENTES ────────────────────────────────────────────
  function cargarComponente(id, url, callback) {
    fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;
        if (callback) callback();
      })
      .catch(err => console.error(`Error cargando ${url}:`, err));
  }

  function cargarScript(path) {
    if (!path) return;
    const fullPath = `recursos/js/${path}?t=${Date.now()}`;
    const prev = document.getElementById("ScriptDinamico");
    if (prev) prev.remove();
    const s = document.createElement("script");
    s.src = fullPath;
    s.id  = "ScriptDinamico";
    document.body.appendChild(s);
  }

  // ─── 4. NAVEGACIÓN INTERNA (AJAX) ────────────────────────────────────────────
  async function _navegarA(pagina, push = true) {
    const ruta = rutas[pagina] || rutas["inicio"];
    const res  = await fetch(ruta.view, {
      headers: { "X-Requested-With": "XMLHttpRequest" }
    });
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    document.getElementById("main").innerHTML = html;
    cargarScript(ruta.script);
    if (push) window.history.pushState({ pagina }, "", `#${pagina}`);
  }

  async function navegarA(pagina, push = true) {
    // Si es pública y hay sesión, redirigimos al dashboard
    if (rutasPublicas.has(pagina)) {
      try {
        const res  = await fetch("includes/autenticacion/estadoSesion.php");
        const sess = await res.json();
        if (sess.loggedIn) {
          return _navegarA(sess.redirect, push);
        }
      } catch (_) {
        // Si falla la verificación, dejamos continuar
      }
    }
    return _navegarA(pagina, push);
  }

  // ─── 5. GLOBALES Y LISTENERS ──────────────────────────────────────────────────
  window.navegarA     = navegarA;
  window.cargarHeader = () => cargarComponente("header", "componentes/header.php", () => {
    cargarScript("componentes/header.js");
  });

  // Manejo del botón Atrás/Adelante
  window.addEventListener("popstate", async e => {
    const pag = e.state?.pagina || location.hash.replace(/^#/, "") || "inicio";
    await navegarA(pag, false);
  });

  // ─── 6. ARRANQUE DE LA APP ────────────────────────────────────────────────────
  // 6.1. Header y Footer fijos
  cargarComponente("header", "componentes/header.php", () => {
    cargarScript("componentes/header.js");
  });
  cargarComponente("footer", "componentes/footer.php");

  // 6.2. Determinar vista inicial
  (async function initApp() {
    let inicial = location.hash.replace(/^#/, "");

    if (!inicial) {
      try {
        const res  = await fetch("includes/autenticacion/estadoSesion.php");
        const sess = await res.json();
        inicial = sess.loggedIn ? sess.redirect : "inicio";
      } catch (_) {
        inicial = "inicio";
      }
    }

    await navegarA(inicial || "inicio", false);
  })();

});
