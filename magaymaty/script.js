document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica para la Pantalla de Carga (Preloader) ---
    const pantallaCarga = document.getElementById('pantalla-carga');
    const body = document.body;

    // Define el tiempo mínimo en milisegundos que la pantalla de carga debe mostrarse
    const tiempoMinimoMilisegundos = 2000; // Unos 2 segundos para que el efecto sea visible

    let recursosCargados = false;
    let tiempoMinimoCumplido = false;

    // 1. Marcar cuando todos los recursos (imágenes, etc.) estén cargados
    window.addEventListener('load', function () {
        recursosCargados = true;
        console.log('Todos los recursos (imágenes, CSS, etc.) han cargado.');
        verificarYocultar();
    });

    // 2. Marcar cuando el tiempo mínimo haya transcurrido
    setTimeout(function () {
        tiempoMinimoCumplido = true;
        console.log('Tiempo mínimo de carga cumplido.');
        verificarYocultar();
    }, tiempoMinimoMilisegundos);

    function verificarYocultar() {
        if (recursosCargados && tiempoMinimoCumplido) {
            console.log('Ocultando pantalla de carga con efecto de fundido...');
            // Añade la clase 'oculto' para activar la transición CSS
            pantallaCarga.classList.add('oculto');

            // ESTA LÍNEA DEBE ESPERAR A QUE LA TRANSICIÓN TERMINE
            pantallaCarga.addEventListener('transitionend', function () {
                pantallaCarga.style.display = 'none'; // Quita el elemento una vez invisible
                body.classList.add('cargado'); // Restaura el scroll del body
            }, { once: true }); // El { once: true } asegura que este evento se dispare solo una vez
        }
    }

    // --- Lógica del Botón de Subida de Formulario ---
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const megaUploadContainer = document.querySelector('.mega-upload-container');

    if (showUploadFormBtn && megaUploadContainer) {
        showUploadFormBtn.addEventListener('click', function () {
            megaUploadContainer.classList.toggle('hidden');
            if (megaUploadContainer.classList.contains('hidden')) {
                this.textContent = 'Subir Fotos y Videos';
            } else {
                this.textContent = 'Ocultar Formulario';
            }
        });
    }

    // --- Lógica del Botón para Abrir Nueva Ventana (openUploadModalBtn) ---
    const openUploadModalBtn = document.getElementById('openUploadModalBtn');

    if (openUploadModalBtn) {
        openUploadModalBtn.addEventListener('click', function () {
            window.open('https://mega.nz/filerequest/nzQT3zwEWKQ', '_blank');
        });
    }

    const openUploadModalBtn2 = document.getElementById('openUploadModalBtn2');

    if (openUploadModalBtn2) {
        openUploadModalBtn2.addEventListener('click', function () {
            window.open('https://mega.nz/filerequest/nzQT3zwEWKQ', '_blank');
        });
    }

    console.log('La lógica principal de la página del casamiento ha sido inicializada.');
});
