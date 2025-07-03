document.addEventListener('DOMContentLoaded', function() {
    const numberOfImages = 98; // Puedes cambiar esto para el número total de fotos que tengas
    const imageBaseName = 'Archivo'; // La base del nombre de tus archivos de imagen (ej. "Archivo 1.jpeg")
    const imageFolderPath = 'imagenes_boda/'; // La carpeta donde están tus imágenes
    const imageExtension = '.jpeg'; // La extensión de tus archivos de imagen

    // Obtener la referencia al ÚNICO contenedor de la galería
    const galleryContainer = document.getElementById('gallery-container');

    // Verificar que el contenedor exista
    if (!galleryContainer) {
        console.error("Error: No se encontró el elemento con ID 'gallery-container'. Asegúrate de que existe en tu HTML.");
        // Opcional: Puede deshabilitar la funcionalidad de la galería si el contenedor no existe.
        return; 
    }

    // Array para almacenar todas las rutas de imagen de la galería en orden
    const allImagePaths = [];
    for (let i = 1; i <= numberOfImages; i++) {
        allImagePaths.push(`${imageFolderPath}${imageBaseName} ${i}${imageExtension}`);
    }

    let currentImageIndex = 0; // Para rastrear qué imagen se muestra en el modal

    // Función para crear un elemento de galería
    function createGalleryItem(index) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const anchor = document.createElement('a');
        anchor.href = `#`; // No es necesario que tenga un href real aquí, solo para el modal
        anchor.setAttribute('data-bs-toggle', 'modal');
        anchor.setAttribute('data-bs-target', '#imageModal');
        anchor.setAttribute('data-image-index', index - 1); // Índice 0-basado para el array

        const img = document.createElement('img');
        img.src = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        img.classList.add('img-fluid');
        img.alt = `Boda Maga y Maty - Imagen ${index}`; // Alt text más descriptivo
        img.loading = 'lazy'; // Carga diferida para optimización

        anchor.appendChild(img);
        galleryItem.appendChild(anchor);

        return galleryItem;
    }

    // Distribuir las imágenes en el ÚNICO contenedor en orden secuencial
    for (let i = 1; i <= numberOfImages; i++) {
        const galleryItem = createGalleryItem(i);
        galleryContainer.appendChild(galleryItem);
    }

    // --- Lógica para el modal de Bootstrap y navegación ---
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = imageModal.querySelector('.modal-title');
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const downloadImageBtn = document.getElementById('downloadImageBtn'); // Obtener referencia al botón de descarga

    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', event => {
            const openerLink = event.relatedTarget;
            // Solo procesar si el evento proviene de un enlace con data-image-index
            if (openerLink && openerLink.hasAttribute('data-image-index')) {
                const imageIndexStr = openerLink.getAttribute('data-image-index');
                currentImageIndex = parseInt(imageIndexStr, 10);
                updateModalContent(currentImageIndex);
            }
        });

        // Opcional: Cerrar el modal con la tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && imageModal.classList.contains('show')) {
                // Utiliza la API de Bootstrap para ocultar el modal
                const bsModal = bootstrap.Modal.getInstance(imageModal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        });
    }

    function updateModalContent(index) {
        if (index < 0) {
            index = allImagePaths.length - 1; // Volver a la última imagen
        } else if (index >= allImagePaths.length) {
            index = 0; // Volver a la primera imagen
        }
        currentImageIndex = index;

        const imageUrl = allImagePaths[currentImageIndex];
        const imageNumber = currentImageIndex + 1; // Para mostrar en el título del modal
        
        // Obtener solo el nombre del archivo para la descarga
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

        modalImage.src = imageUrl;
        modalImage.alt = `Imagen ${imageNumber}`; // Alt text en el modal
        modalTitle.textContent = ``; // Título del modal
        
        // ACTUALIZAR EL ENLACE DE DESCARGA
        if (downloadImageBtn) {
            downloadImageBtn.href = imageUrl;
            downloadImageBtn.setAttribute('download', fileName); // Sugiere un nombre de archivo para la descarga
        }
    }

    // Event listeners para los botones de navegación
    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', () => {
            updateModalContent(currentImageIndex - 1);
        });
    }

    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', () => {
            updateModalContent(currentImageIndex + 1);
        });
    }

    // Navegación con teclado para el modal de imágenes
    document.addEventListener('keydown', function(event) {
        if (imageModal && imageModal.classList.contains('show')) { // Comprobar si el modal está abierto actualmente
            if (event.key === 'ArrowLeft') {
                updateModalContent(currentImageIndex - 1);
            } else if (event.key === 'ArrowRight') {
                updateModalContent(currentImageIndex + 1);
            }
        }
    });

    // --- Lógica del Preloader (opcional, descomentar si se usa) ---
    // const pantallaCarga = document.getElementById('pantalla-carga');
    // const body = document.body;

    // const tiempoMinimoMilisegundos = 2000; 

    // let recursosCargados = false;
    // let tiempoMinimoCumplido = false;

    // window.addEventListener('load', function () {
    //     recursosCargados = true;
    //     console.log('Todos los recursos (imágenes, CSS, etc.) han cargado.');
    //     verificarYocultar();
    // });

    // setTimeout(function () {
    //     tiempoMinimoCumplido = true;
    //     console.log('Tiempo mínimo de carga cumplido.');
    //     verificarYocultar();
    // }, tiempoMinimoMilisegundos);

    // function verificarYocultar() {
    //     if (recursosCargados && tiempoMinimoCumplido) {
    //         console.log('Ocultando pantalla de carga con efecto de fundido...');
    //         pantallaCarga.classList.add('oculto');

    //         pantallaCarga.addEventListener('transitionend', function () {
    //             pantallaCarga.style.display = 'none';
    //             body.classList.add('cargado');
    //             // openCanvaModal(); // Abre el modal de Canva después de que el preloader se haya ocultado
    //         }, { once: true });
    //     }
    // }


    // --- Lógica para Abrir/Cerrar el Modal de Canva (si lo está utilizando) ---
    // const canvaModal = document.getElementById('canvaModal');
    // const closeCanvaModalBtn = document.getElementById('closeCanvaModalBtn');

    // function openCanvaModal() {
    //     if (canvaModal) {
    //         canvaModal.style.display = 'flex';
    //         setTimeout(() => {
    //             canvaModal.classList.add('show');
    //         }, 10);
    //         document.body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
    //     }
    // }

    // function closeCanvaModal() {
    //     if (canvaModal) {
    //         canvaModal.classList.remove('show');
    //         setTimeout(() => {
    //             canvaModal.style.display = 'none';
    //             document.body.style.overflow = ''; // Restaura el scroll en el body
    //         }, 300); // Coincide con la duración de la transición CSS
    //     }
    // }

    // if (closeCanvaModalBtn) {
    //     closeCanvaModalBtn.addEventListener('click', closeCanvaModal);
    // }

    // if (canvaModal) {
    //     canvaModal.addEventListener('click', function(event) {
    //         if (event.target === canvaModal) { // Solo cierra si el clic es en el fondo del modal
    //             closeCanvaModal();
    //         }
    //     });
    // }

    // document.addEventListener('keydown', function(event) {
    //     if (event.key === 'Escape' && canvaModal && canvaModal.classList.contains('show')) {
    //         closeCanvaModal();
    //     }
    // });

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
            document.body.style.overflow = 'hidden'; // Evita el scroll en el body cuando el modal está abierto
        });

        closeWishesModalBtn.addEventListener('click', function() {
            wishesModal.classList.remove('show');
            setTimeout(() => { // Espera a que la transición termine antes de ocultar completamente
                wishesModal.style.display = 'none';
                document.body.style.overflow = ''; // Restaura el scroll en el body
            }, 300); // Coincide con la duración de la transición CSS
        });

        // Cierra el modal si se hace clic fuera del contenido
        wishesModal.addEventListener('click', function(event) {
            if (event.target == wishesModal) {
                wishesModal.classList.remove('show');
                setTimeout(() => {
                    wishesModal.style.display = 'none';
                    document.body.style.overflow = '';
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
                            document.body.style.overflow = '';
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