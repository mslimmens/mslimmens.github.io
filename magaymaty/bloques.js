document.addEventListener('DOMContentLoaded', function() {
    const numberOfImages = 21; // Puedes cambiar esto para el número total de fotos que tengas
    const imageBaseName = 'Archivo'; // La base del nombre de tus archivos de imagen (ej. "Archivo 1.jpeg")
    const imageFolderPath = 'imagenes_boda/'; // La carpeta donde están tus imágenes
    const imageExtension = '.jpeg'; // La extensión de tus archivos de imagen

    // Obtener las referencias a las columnas
    const columns = [
        document.getElementById('gallery-col-1'),
        document.getElementById('gallery-col-2'),
        document.getElementById('gallery-col-3'),
        document.getElementById('gallery-col-4')
    ];

    // Verificar que todas las columnas existen
    if (columns.some(col => col === null)) {
        console.error("Error: No se encontraron todos los elementos de columna. Asegúrate de que los IDs 'gallery-col-1' a 'gallery-col-4' existen en tu HTML.");
        return; // Salir si falta alguna columna
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
        anchor.href = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        anchor.setAttribute('data-bs-toggle', 'modal');
        anchor.setAttribute('data-bs-target', '#imageModal');
        anchor.setAttribute('data-image-index', index - 1); // Índice 0-basado para el array

        const img = document.createElement('img');
        img.src = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        img.classList.add('img-fluid');
        img.alt = `Boda Maga y Maty`;

        anchor.appendChild(img);
        galleryItem.appendChild(anchor);

        return galleryItem;
    }

    // Distribuir las imágenes en las columnas
    for (let i = 1; i <= numberOfImages; i++) {
        const galleryItem = createGalleryItem(i);
        const columnIndex = (i - 1) % columns.length;
        columns[columnIndex].appendChild(galleryItem);
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
            const imageIndexStr = openerLink.getAttribute('data-image-index');
            currentImageIndex = parseInt(imageIndexStr, 10);

            updateModalContent(currentImageIndex);
        });
    }

    function updateModalContent(index) {
        if (index < 0) {
            index = allImagePaths.length - 1;
        } else if (index >= allImagePaths.length) {
            index = 0;
        }
        currentImageIndex = index;

        const imageUrl = allImagePaths[currentImageIndex];
        const imageNumber = currentImageIndex + 1;
        
        // Obtener solo el nombre del archivo para la descarga
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

        modalImage.src = imageUrl;
        modalImage.alt = `Maga y Maty`;
        modalTitle.textContent = `Maga y Maty`;
        
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
});