document.addEventListener('DOMContentLoaded', function() {
    const pantallaCarga = document.getElementById('pantalla-carga');
    const body = document.body;

    // Añade una clase para iniciar la transición de ocultado
    pantallaCarga.classList.add('oculto');

    // Elimina el elemento de la pantalla de carga del DOM después de la transición
    pantallaCarga.addEventListener('transitionend', function() {
        pantallaCarga.style.display = 'none'; // Asegúrate de que no ocupe espacio
        body.classList.add('cargado'); // Restaura el scrollbar del body
    }, { once: true }); // El { once: true } asegura que el evento se dispare solo una vez
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('La página del casamiento ha cargado completamente.');

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

document.addEventListener('DOMContentLoaded', function() {
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const megaUploadContainer = document.querySelector('.mega-upload-container');

    if (showUploadFormBtn && megaUploadContainer) {
        showUploadFormBtn.addEventListener('click', function() {
            // Alternar la clase 'hidden'
            megaUploadContainer.classList.toggle('hidden');

            // Cambiar el texto del botón según si el formulario está visible
            if (megaUploadContainer.classList.contains('hidden')) {
                showUploadFormBtn.textContent = 'Subir Fotos y Videos';
            } else {
                showUploadFormBtn.textContent = 'Ocultar Formulario';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const openUploadModalBtn = document.getElementById('openUploadModalBtn');
    const megaUploadModal = document.getElementById('megaUploadModal');
    const closeButton = document.querySelector('.close-button');

    // Función para abrir el modal
    function openModal() {
        megaUploadModal.style.display = 'block';
    }

    // Función para cerrar el modal
    function closeModal() {
        megaUploadModal.style.display = 'none';
    }

    // Event listeners
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
});
