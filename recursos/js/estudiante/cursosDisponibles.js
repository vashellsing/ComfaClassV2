// Variables globales para almacenar los cursos
let cursosDisponibles = [];

document.addEventListener('DOMContentLoaded', function() {
    // Cargar cursos disponibles al cargar la página
    cargarCursosDisponibles();
    
    // Configurar el mensaje de éxito para que se pueda cerrar
    const btnCerrarMensaje = document.querySelector('#mensajeExito .btn-close');
    if (btnCerrarMensaje) {
        btnCerrarMensaje.addEventListener('click', function() {
            document.getElementById('mensajeExito').classList.remove('show');
        });
    }
});

// Función para cargar los cursos disponibles
function cargarCursosDisponibles() {
    fetch('includes/estudiante/obtenerCursosDisponibles.php')
        .then(response => response.json())
        .then(data => {
            const tablaCursos = document.getElementById('tablaCursosDisponibles');
            
            if (data.error) {
                tablaCursos.innerHTML = `<tr><td colspan="5" class="text-center text-danger">${data.error}</td></tr>`;
                return;
            }
            
            // Guardar los cursos en la variable global
            cursosDisponibles = data.cursos || [];
            
            actualizarTablaCursosDisponibles();
        })
        .catch(error => {
            console.error('Error:', error);
            const tablaCursos = document.getElementById('tablaCursosDisponibles');
            tablaCursos.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error al cargar los cursos. Por favor, intenta de nuevo más tarde.</td></tr>';
        });
}

// Función para actualizar la tabla de cursos disponibles
function actualizarTablaCursosDisponibles() {
    const tablaCursos = document.getElementById('tablaCursosDisponibles');
    
    if (cursosDisponibles.length > 0) {
        let html = '';
        cursosDisponibles.forEach(curso => {
            html += `
            <tr>
                <td>${curso.nombre_curso}</td>
                <td>${curso.nombre_profesor}</td>
                <td>${curso.descripcion_curso}</td>
                <td>${curso.nombre_materia}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="inscribirCurso(${curso.id_curso})">
                        <i class="bi bi-plus-circle me-1"></i>Agregar
                    </button>
                </td>
            </tr>
            `;
        });
        tablaCursos.innerHTML = html;
    } else {
        tablaCursos.innerHTML = '<tr><td colspan="5" class="text-center">No hay cursos disponibles en este momento.</td></tr>';
    }
}

// Función para inscribir al estudiante en un curso
function inscribirCurso(idCurso) {
    const formData = new FormData();
    formData.append('id_curso', idCurso);
    
    fetch('includes/estudiante/inscribirCurso.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        
        // Mostrar mensaje de éxito
        const mensajeExito = document.getElementById('mensajeExito');
        mensajeExito.classList.add('show');
        
        // Eliminar el curso de la lista de disponibles
        cursosDisponibles = cursosDisponibles.filter(curso => curso.id_curso != idCurso);
        
        // Actualizar la tabla
        actualizarTablaCursosDisponibles();
        
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeExito.classList.remove('show');
        }, 3000);
        
        // Recargar la página de cursos inscritos si está abierta en otra pestaña
        if (window.opener && !window.opener.closed && window.opener.cargarCursosInscritos) {
            window.opener.cargarCursosInscritos();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al inscribir en el curso. Por favor, intenta de nuevo más tarde.');
    });
}