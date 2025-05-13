document.addEventListener("DOMContentLoaded", () => {
    const rutas = {
      inicio:               { view: "paginas/inicio.php",              script: null },
      iniciarSesion:        { view: "paginas/iniciarSesion.php",       script: "autenticacion/iniciarSesion.js" },
      registro:             { view: "paginas/registro.php",            script: "autenticacion/registro.js" },
      administradorVista:   { view: "paginas/administradorVista.php",  script: "administrador/administradorVista.js" },
      estudianteVista:      { view: "paginas/estudianteVista.php",     script: "estudianteVista.js" },
      invitadoVista:        { view: "paginas/invitadoVista.php",       script: null },
      profesorVista:        { view: "paginas/profesorVista.php",       script: null },
      profesorCrearCursos:  { view: "paginas/profesorCrearCursos.php", script: "profesor/profesorCrearCursos.js" },
      profesorVerCursos:    { view: "paginas/profesorVerCursos.php",   script: "profesor/profesorVerCursos.js" }
    };
  
    // Rutas que sólo se cargan si NO hay sesión
    const rutasPublicas = new Set([
      'inicio',
      'iniciarSesion',
      'registro'
    ]);
  
    function cargarComponente(id, url) {
      fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(r => {
          if (!r.ok) throw new Error(r.status);
          return r.text();
        })
        .then(html => document.getElementById(id).innerHTML = html)
        .catch(e => console.error(`Error cargando ${url}:`, e));
    }
  
    function cargarScript(scriptFile) {
      if (!scriptFile) return;
      const rutaScript = `recursos/js/${scriptFile}?t=${Date.now()}`;
      const existente  = document.getElementById("ScriptDinamico");
      if (existente) existente.remove();
      const s = document.createElement("script");
      s.src = rutaScript;
      s.id  = "ScriptDinamico";
      document.body.appendChild(s);
    }
  
    // Carga parcial, siempre con el header AJAX
    async function _navegar(pagina, agregarHistorial = true) {
      const ruta = rutas[pagina] || rutas["inicio"];
      const res  = await fetch(ruta.view, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });
      if (!res.ok) throw new Error(res.status);
      const html = await res.text();
      document.getElementById("main").innerHTML = html;
      cargarScript(ruta.script);
      if (agregarHistorial) {
        window.history.pushState({ pagina }, "", `#${pagina}`);
      }
    }
  
    // Esta es la función global de navegación:
    async function navegarA(pagina, agregarHistorial = true) {
      // 1) Si es una ruta pública y hay sesión activa, redirige a su dashboard
      if (rutasPublicas.has(pagina)) {
        try {
          const res  = await fetch("includes/autenticacion/estadoSesion.php");
          const sess = await res.json();
          if (sess.loggedIn) {
            return _navegar(sess.redirect, agregarHistorial);
          }
        } catch (_) {
          // si falla, permitimos cargar la pública
        }
      }
      // 2) Si no es pública o no hay sesión, carga normalmente
      return _navegar(pagina, agregarHistorial);
    }
  
    // Exponer la función
    window.navegarA = navegarA;
    window.cargarHeader = () => cargarComponente("header", "componentes/header.php");
  
    // Historico del navegador
    window.addEventListener("popstate", async e => {
      const pag = e.state?.pagina || location.hash.replace(/^#/, "") || "inicio";
      await navegarA(pag, false);
    });
  
    // Carga inicial de header/footer
    cargarComponente("header", "componentes/header.php");
    // Una vez inyectado el HTML del header, carga su comportamiento
    cargarScript("componentes/header.js");
    cargarComponente("footer", "componentes/footer.php");
  
    // Inicializar la aplicación: si no hay hash, preguntar sesión
    (async function initApp() {
      let inicial = location.hash.replace(/^#/, "");
      if (!inicial) {
        try {
          const res  = await fetch("includes/autenticacion/estadoSesion.php");
          const sess = await res.json();
          inicial = sess.loggedIn ? sess.redirect : "inicio";
        } catch (_){
          inicial = "inicio";
        }
      }
      await navegarA(inicial || "inicio", false);
    })();
  });
  