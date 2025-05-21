// Espera a que todo el contenido del HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Se buscan los botones que tienen el atributo onclick para cambiar de vista
    // Botón para ir a "Cursos Disponibles"
    const btnCursosDisponibles = document.querySelector('button[onclick="navegarA(\'cursosDisponibles\')"]');
    // Botón para ir a "Cursos Inscritos"
    const btnCursosInscritos = document.querySelector('button[onclick="navegarA(\'cursosInscritos\')"]');
    
     // Si se encontró el botón de cursos disponibles
    if (btnCursosDisponibles) {
        btnCursosDisponibles.addEventListener('click', function() {
            // Aquí se puede agregar más lógica si se necesita hacer algo antes de navegar
            console.log('Navegando a cursos disponibles');
        });
    }
    
    // Si se encontró el botón de cursos inscritos
    if (btnCursosInscritos) {
        btnCursosInscritos.addEventListener('click', function() {
            // Aquí también se puede poner más lógica antes de cambiar de vista
            console.log('Navegando a cursos inscritos');
        });
    }
});