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
            }, { once: true });
        }
    }

    // --- Lógica para Abrir/Cerrar el Modal de Buenos Deseos ---
    const openWishesModalBtn = document.getElementById('openWishesModalBtn');
    const wishesModal = document.getElementById('wishesModal');
    const closeButton = wishesModal.querySelector('.close-button');

    if (openWishesModalBtn && wishesModal && closeButton) {
        openWishesModalBtn.addEventListener('click', function() {
            wishesModal.style.display = 'flex'; // Cambia a flex para centrar
            setTimeout(() => { // Pequeño retraso para que la transición de opacidad funcione
                wishesModal.classList.add('show');
            }, 10);
            body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
        });

        closeButton.addEventListener('click', function() {
            wishesModal.classList.remove('show');
            setTimeout(() => { // Espera a que la transición termine antes de ocultar completamente
                wishesModal.style.display = 'none';
                body.style.overflow = ''; // Restaura el scroll en el body
            }, 300); // Coincide con la duración de la transición CSS
        });

        // Cierra el modal si se hace clic fuera del contenido
        window.addEventListener('click', function(event) {
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
    // ¡¡¡ REEMPLAZA ESTA URL CON LA TUYA ACTUALIZADA DE GOOGLE APPS SCRIPT !!!
    let scripURL = 'https://script.google.com/macros/s/AKfycbysFkJRtW1UGgKJ8zC7B79IPINJ7gbmUZJjs6JDgJndVrcGvPvXxE3IaomTBhNCKZU_/exec'; 
    let formModal = document.forms['submit-form-modal']; // Referencia al formulario dentro del modal

    if (formModal) { 
        formModal.addEventListener('submit', e => {
            e.preventDefault();
            
            // Opcional: Mostrar un mensaje de carga mientras se envía
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
                    wishesModal.classList.remove('show'); // Cierra el modal al enviar
                    setTimeout(() => {
                        wishesModal.style.display = 'none';
                        body.style.overflow = '';
                    }, 300); 
                } else {
                    alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.');
                }
            })
            .catch((error) => {
                console.error('Error al enviar el formulario:', error.message);
                alert('Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
            })
            .finally(() => {
                submitButton.disabled = false; // Habilitar el botón de nuevo
                submitButton.textContent = 'Enviar Deseo'; // Restaurar texto del botón
            });
        });
    }

    // --- Lógica del Botón de Subida de Formulario (Antiguo showUploadFormBtn) ---
    // (Mantén o elimina esto según lo necesites)
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
