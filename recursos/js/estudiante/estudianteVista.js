document.addEventListener('DOMContentLoaded', function() {
    // Configurar los botones de navegación
    const btnCursosDisponibles = document.querySelector('button[onclick="navegarA(\'cursosDisponibles\')"]');
    const btnCursosInscritos = document.querySelector('button[onclick="navegarA(\'cursosInscritos\')"]');
    
    if (btnCursosDisponibles) {
        btnCursosDisponibles.addEventListener('click', function() {
            // Puedes agregar lógica adicional aquí si es necesario
            console.log('Navegando a cursos disponibles');
        });
    }
    
    if (btnCursosInscritos) {
        btnCursosInscritos.addEventListener('click', function() {
            // Puedes agregar lógica adicional aquí si es necesario
            console.log('Navegando a cursos inscritos');
        });
    }
});