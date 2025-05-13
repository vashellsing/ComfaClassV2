(() => {
    function cargarAlumnos() {
        fetch('./includes/ObtenerAlumProfesor.php') // ← Ruta corregida
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                mostrarAlumnosEnTabla(data);
            })
            .catch(error => {
                console.error('Error al cargar los alumnos:', error);
                const cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');
                cuerpoTabla.innerHTML = `
                    <tr>
                      <td colspan="5" class="text-center">
                        ${error.message}
                      </td>
                    </tr>`;
            });
    }

    function mostrarAlumnosEnTabla(alumnos) {
        const cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');
        if (cuerpoTabla) {
            cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

            if (alumnos && alumnos.length > 0) {
                alumnos.forEach(alumno => {
                    const fila = cuerpoTabla.insertRow();

                    const generoCelda = fila.insertCell();
                    generoCelda.textContent = alumno.genero; // Ajusta 'genero' al nombre del campo en tu base de datos

                    const identificacionCelda = fila.insertCell();
                    identificacionCelda.textContent = alumno.identificacion; // Ajusta 'identificacion' al nombre del campo

                    const nombreCelda = fila.insertCell();
                    nombreCelda.textContent = alumno.nombre; // Ajusta 'nombre' al nombre del campo

                    const apellidoCelda = fila.insertCell();
                    apellidoCelda.textContent = alumno.apellido; // Ajusta 'apellido' al nombre del campo

                    const correoCelda = fila.insertCell();
                    correoCelda.textContent = alumno.correo; // Ajusta 'correo' al nombre del campo
                });
            } else {
                cuerpoTabla.innerHTML = `<tr><td colspan="5" class="text-center">No se encontraron alumnos registrados.</td></tr>`;
            }
        }
    }

    // Cargar los alumnos al cargar la página
    cargarAlumnos();
})();
