// Variables globales para almacenar los cursos
let cursosInscritos = [];

document.addEventListener('DOMContentLoaded', function() {
    // Cargar cursos inscritos al cargar la página
    cargarCursosInscritos();
    
    // Configurar el botón de confirmación de eliminación
    document.getElementById('btnConfirmarEliminar').addEventListener('click', function() {
        const idCurso = this.getAttribute('data-id-curso');
        if (idCurso) {
            eliminarInscripcion(idCurso);
        }
    });
});

// Función para cargar los cursos inscritos
function cargarCursosInscritos() {
    fetch('includes/estudiante/obtenerCursosInscritos.php')
        .then(response => response.json())
        .then(data => {
            const tablaCursos = document.getElementById('tablaCursosInscritos');
            
            if (data.error) {
                tablaCursos.innerHTML = `<tr><td colspan="5" class="text-center text-danger">${data.error}</td></tr>`;
                return;
            }
            
            // Guardar los cursos en la variable global
            cursosInscritos = data.cursos || [];
            
            actualizarTablaCursosInscritos();
        })
        .catch(error => {
            console.error('Error:', error);
            const tablaCursos = document.getElementById('tablaCursosInscritos');
            tablaCursos.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Error al cargar los cursos. Por favor, intenta de nuevo más tarde.</td></tr>';
        });
}

// Función para actualizar la tabla de cursos inscritos
function actualizarTablaCursosInscritos() {
    const tablaCursos = document.getElementById('tablaCursosInscritos');
    
    if (cursosInscritos.length > 0) {
        let html = '';
        cursosInscritos.forEach(curso => {
            // Formatear la fecha
            const fecha = new Date(curso.fecha_inscripcion);
            const fechaFormateada = fecha.toLocaleDateString();
            
            html += `
            <tr>
                <td>${curso.nombre_curso}</td>
                <td>${curso.nombre_profesor}</td>
                <td>${curso.descripcion_curso}</td>
                <td>${fechaFormateada}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="confirmarEliminar(${curso.id_curso})">
                        <i class="bi bi-trash me-1"></i>Eliminar
                    </button>
                </td>
            </tr>
            `;
        });
        tablaCursos.innerHTML = html;
    } else {
        tablaCursos.innerHTML = '<tr><td colspan="5" class="text-center">No estás inscrito en ningún curso todavía.</td></tr>';
    }
}

// Función para mostrar el modal de confirmación
function confirmarEliminar(idCurso) {
    const btnConfirmar = document.getElementById('btnConfirmarEliminar');
    btnConfirmar.setAttribute('data-id-curso', idCurso);
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
    modal.show();
}

// Función para eliminar la inscripción
function eliminarInscripcion(idCurso) {
    const formData = new FormData();
    formData.append('id_curso', idCurso);
    
    fetch('includes/estudiante/eliminarInscripcion.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Cerrar el modal
        const modalElement = document.getElementById('modalConfirmacion');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
        if (data.error) {
            alert(data.error);
            return;
        }
        
        // Eliminar el curso de la lista de inscritos
        cursosInscritos = cursosInscritos.filter(curso => curso.id_curso != idCurso);
        
        // Actualizar la tabla
        actualizarTablaCursosInscritos();
        
        // Recargar la página de cursos disponibles si está abierta en otra pestaña
        if (window.opener && !window.opener.closed && window.opener.cargarCursosDisponibles) {
            window.opener.cargarCursosDisponibles();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar la inscripción. Por favor, intenta de nuevo más tarde.');
    });
}