$(document).ready(function() {
    // Cargar la sección de inicio al cargar la página
    $('#content-container').load('inicio.html');

    $('.nav-link').on('click', function(e) {
        e.preventDefault(); // Evitar la navegación predeterminada del enlace
        $('.nav-item').removeClass('active');
        $(this).parent().addClass('active');
        var section = $(this).data('section');
        $('#content-container').load(section);
    });
});