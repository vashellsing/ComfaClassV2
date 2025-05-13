(() => {
  document.body.addEventListener("click", async (e) => {
    if (e.target.id === "logout-btn") {
      e.preventDefault();

      try {
        // 1) Llamamos al endpoint correcto
        const res = await fetch("includes/autenticacion/cerrarSesion.php", {
          method: "POST",
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        // opcional: podrías comprobar res.ok o el JSON {success:true}
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      }

      // 2) Recargamos el header para quitar nombre y botón
      if (typeof window.cargarHeader === "function") {
        window.cargarHeader();
      }

      // 3) Redirigimos al inicio de sesión (ruta pública)
      if (typeof window.navegarA === "function") {
        window.navegarA("inicio");
      } else {
        window.location.href = "index.php";
      }
    }
  });
})();
