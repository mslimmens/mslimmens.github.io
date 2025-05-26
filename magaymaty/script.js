document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para la Pantalla de Carga (Preloader) ---
    const pantallaCarga = document.getElementById('pantalla-carga');
    const body = document.body;

    // Define el tiempo mínimo en milisegundos que la pantalla de carga debe mostrarse
    const tiempoMinimoMilisegundos = 2000; // 3 segundos

    let recursosCargados = false;
    let tiempoMinimoCumplido = false;

    // 1. Marcar cuando todos los recursos (imágenes, etc.) estén cargados
    // Se usa window.load porque es el evento que asegura que TODAS las imágenes, hojas de estilo, etc., han terminado de cargar.
    window.addEventListener('load', function() {
        recursosCargados = true;
        console.log('Todos los recursos (imágenes, CSS, etc.) han cargado.');
        verificarYocultar();
    });

    // 2. Marcar cuando el tiempo mínimo haya transcurrido
    setTimeout(function() {
        tiempoMinimoCumplido = true;
        console.log('Tiempo mínimo de carga cumplido.');
        verificarYocultar();
    }, tiempoMinimoMilisegundos);

    // Función para verificar todas las condiciones y ocultar la pantalla de carga
    function verificarYocultar() {
        // La pantalla de carga se ocultará SOLO cuando:
        // a) Todos los recursos hayan cargado (recursosCargados = true)
        // b) Haya pasado el tiempo mínimo establecido (tiempoMinimoCumplido = true)
        if (recursosCargados && tiempoMinimoCumplido) {
            console.log('Ocultando pantalla de carga...');
            // Añade una clase para iniciar la transición de ocultado (definida en CSS)
            pantallaCarga.classList.add('oculto');

            // Elimina el elemento de la pantalla de carga del DOM después de que la transición CSS termine
            // Esto asegura que no ocupe espacio ni interfiera con eventos de clic una vez invisible.
            pantallaCarga.addEventListener('transitionend', function() {
                pantallaCarga.style.display = 'none'; // Quita el elemento del flujo del documento
                body.classList.add('cargado'); // Restaura el scrollbar del body
            }, { once: true }); // El { once: true } asegura que este evento se dispare solo una vez
        }
    }

    // --- Lógica del Botón de Subida de Formulario (Antiguo showUploadFormBtn) ---
    // NOTA: Si el elemento '.mega-upload-container' ya no existe y ahora usas el modal,
    // esta sección puede ser eliminada. La mantengo por si aún la necesitas para algo diferente al modal.
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const megaUploadContainer = document.querySelector('.mega-upload-container');

    if (showUploadFormBtn && megaUploadContainer) {
        showUploadFormBtn.addEventListener('click', function() {
            // Alternar la clase 'hidden' (asegúrate de que esta clase oculta el elemento en tu CSS)
            megaUploadContainer.classList.toggle('hidden');

            // Cambiar el texto del botón según si el formulario está visible
            if (megaUploadContainer.classList.contains('hidden')) {
                this.textContent = 'Subir Fotos y Videos'; // 'this' se refiere al botón clickeado
            } else {
                this.textContent = 'Ocultar Formulario';
            }
        });
    }

    // --- Lógica del Modal de Subida de Fotos y Videos ---
    const openUploadModalBtn = document.getElementById('openUploadModalBtn');
    const megaUploadModal = document.getElementById('megaUploadModal');
    const closeButton = document.querySelector('.modal .close-button'); // Asegura que se selecciona el botón de cerrar del modal

    // Función para abrir el modal
    function openModal() {
        if (megaUploadModal) {
            megaUploadModal.style.display = 'block';
            body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
        }
    }

    // Función para cerrar el modal
    function closeModal() {
        if (megaUploadModal) {
            megaUploadModal.style.display = 'none';
            body.style.overflow = 'auto'; // Restaura el scroll en el body
        }
    }

    // Event listeners para el modal
    if (openUploadModalBtn && megaUploadModal && closeButton) {
        // Abrir modal al hacer clic en el botón "Subir Fotos y Videos"
        openUploadModalBtn.addEventListener('click', openModal);

        // Cerrar modal al hacer clic en la 'x'
        closeButton.addEventListener('click', closeModal);

        // Cerrar modal al hacer clic fuera del contenido del modal
        window.addEventListener('click', function(event) {
            if (event.target === megaUploadModal) {
                closeModal();
            }
        });

        // Cerrar modal al presionar la tecla ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }

    // --- Otros scripts que puedas tener ---
    console.log('La lógica principal de la página del casamiento ha sido inicializada.');

    // Ejemplo: Si tuvieras enlaces de navegación que quieres que se desplacen suavemente
    // const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    // smoothScrollLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // Aquí podrías añadir más lógica JS si la necesitas, como un contador de tiempo para la boda.
});
