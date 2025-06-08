document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica para la Pantalla de Carga (Preloader) ---
    const pantallaCarga = document.getElementById('pantalla-carga');
    const body = document.body;

    const tiempoMinimoMilisegundos = 2000; 

    let recursosCargados = false;
    let tiempoMinimoCumplido = false;

    window.addEventListener('load', function () {
        recursosCargados = true;
        console.log('Todos los recursos (imágenes, CSS, etc.) han cargado.');
        verificarYocultar();
    });

    setTimeout(function () {
        tiempoMinimoCumplido = true;
        console.log('Tiempo mínimo de carga cumplido.');
        verificarYocultar();
    }, tiempoMinimoMilisegundos);

    function verificarYocultar() {
        if (recursosCargados && tiempoMinimoCumplido) {
            console.log('Ocultando pantalla de carga con efecto de fundido...');
            pantallaCarga.classList.add('oculto');

            pantallaCarga.addEventListener('transitionend', function () {
                pantallaCarga.style.display = 'none';
                body.classList.add('cargado');
                openCanvaModal(); // Abre el modal de Canva después de que el preloader se haya ocultado
            }, { once: true });
        }
    }

    // --- Lógica para Abrir/Cerrar el Modal de Canva al inicio ---
    const canvaModal = document.getElementById('canvaModal');
    const closeCanvaModalBtn = document.getElementById('closeCanvaModalBtn');

    function openCanvaModal() {
        if (canvaModal) {
            canvaModal.style.display = 'flex';
            setTimeout(() => {
                canvaModal.classList.add('show');
            }, 10);
            body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
        }
    }

    function closeCanvaModal() {
        if (canvaModal) {
            canvaModal.classList.remove('show');
            setTimeout(() => {
                canvaModal.style.display = 'none';
                body.style.overflow = ''; // Restaura el scroll en el body
            }, 300); // Coincide con la duración de la transición CSS
        }
    }

    if (closeCanvaModalBtn) {
        closeCanvaModalBtn.addEventListener('click', closeCanvaModal);
    }

    if (canvaModal) {
        canvaModal.addEventListener('click', function(event) {
            if (event.target === canvaModal) { // Solo cierra si el clic es en el fondo del modal
                closeCanvaModal();
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && canvaModal && canvaModal.classList.contains('show')) {
            closeCanvaModal();
        }
    });

    // --- Logic for the "Upload Photos and Videos" buttons ---
    const openUploadModalBtn = document.getElementById('openUploadModalBtn');
    const openUploadModalBtn2 = document.getElementById('openUploadModalBtn2');

    // Define the URL where photos and videos will be uploaded
    const uploadURL = 'https://mega.nz/filerequest/nzQT3zwEWKQ';

    // Add click event listener to the first button
    if (openUploadModalBtn) {
        openUploadModalBtn.addEventListener('click', function () {
            // Open the specified URL in a new tab/window
            window.open(uploadURL, '_blank');
        });
    }

    // Add click event listener to the second button
    if (openUploadModalBtn2) {
        openUploadModalBtn2.addEventListener('click', function () {
            // Open the specified URL in a new tab/window
            window.open(uploadURL, '_blank');
        });
    }

    // --- Lógica para Abrir/Cerrar el Modal de Buenos Deseos ---
    const openWishesModalBtn = document.getElementById('openWishesModalBtn');
    const wishesModal = document.getElementById('wishesModal');
    // Asegurarse de que wishesModal y closeButton existan antes de intentar usarlos
    const closeWishesModalBtn = wishesModal ? wishesModal.querySelector('.close-button') : null;

    if (openWishesModalBtn && wishesModal && closeWishesModalBtn) {
        openWishesModalBtn.addEventListener('click', function() {
            wishesModal.style.display = 'flex'; // Cambia a flex para centrar
            setTimeout(() => { // Pequeño retraso para que la transición de opacidad funcione
                wishesModal.classList.add('show');
            }, 10);
            body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
        });

        closeWishesModalBtn.addEventListener('click', function() {
            wishesModal.classList.remove('show');
            setTimeout(() => { // Espera a que la transición termine antes de ocultar completamente
                wishesModal.style.display = 'none';
                body.style.overflow = ''; // Restaura el scroll en el body
            }, 300); // Coincide con la duración de la transición CSS
        });

        // Cierra el modal si se hace clic fuera del contenido
        wishesModal.addEventListener('click', function(event) {
            if (event.target == wishesModal) {
                wishesModal.classList.remove('show');
                setTimeout(() => {
                    wishesModal.style.display = 'none';
                    body.style.overflow = '';
                }, 300);
            }
        });
    }

    // --- Lógica del Formulario de Buenos Deseos (Google Apps Script) para el Modal ---
    let scripURL = 'https://script.google.com/macros/s/AKfycbysFkJRtW1UGgKJ8zC7B79IPINJ7gbmUZJjs6JDgJndVrcGvPvXxE3IaomTBhNCKZU_/exec';
    let formModal = document.forms['submit-form-modal']; // Referencia al formulario dentro del modal

    if (formModal) {
        formModal.addEventListener('submit', e => {
            e.preventDefault();

            const submitButton = formModal.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            fetch(scripURL, {
                method: 'POST',
                body: new FormData(formModal)
            })
            .then((res) => {
                console.log(res);
                if(res.status === 200){
                    formModal.reset();
                    alert('¡Mensaje Enviado Correctamente! Gracias por tus buenos deseos.');
                    if (wishesModal) { // Asegurarse de que wishesModal exista antes de intentar cerrarlo
                        wishesModal.classList.remove('show');
                        setTimeout(() => {
                            wishesModal.style.display = 'none';
                            body.style.overflow = '';
                        }, 300);
                    }
                } else {
                    alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.');
                }
            })
            .catch((error) => {
                console.error('Error al enviar el formulario:', error.message);
                alert('Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Deseo';
            });
        });
    }

    // --- Lógica del Botón de Subida de Formulario (Antiguo showUploadFormBtn) ---
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

    console.log('La lógica principal de la página del casamiento ha sido inicializada.');
});
