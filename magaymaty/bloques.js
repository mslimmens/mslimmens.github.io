document.addEventListener('DOMContentLoaded', function() {
    const numberOfImages = 40; // Puedes cambiar esto para el número total de fotos que tengas
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
        // Usamos el índice real (1-basado) para el nombre de archivo y la descripción
        anchor.href = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        anchor.setAttribute('data-bs-toggle', 'modal');
        anchor.setAttribute('data-bs-target', '#imageModal');
        // Almacenamos el índice 0-basado de la imagen en el data-attribute para fácil acceso
        anchor.setAttribute('data-image-index', index - 1);

        const img = document.createElement('img');
        img.src = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        img.classList.add('img-fluid');
        img.alt = `Descripción de la foto ${index}`;

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

    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', event => {
            const openerLink = event.relatedTarget; // El enlace que abrió el modal
            const imageIndexStr = openerLink.getAttribute('data-image-index');
            currentImageIndex = parseInt(imageIndexStr, 10); // Guarda el índice actual

            updateModalContent(currentImageIndex); // Actualiza el contenido al abrir
        });
    }

    function updateModalContent(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index < 0) {
            index = allImagePaths.length - 1; // Si es menor que 0, ir a la última
        } else if (index >= allImagePaths.length) {
            index = 0; // Si es mayor o igual al total, ir a la primera
        }
        currentImageIndex = index; // Actualiza el índice global

        const imageUrl = allImagePaths[currentImageIndex];
        const imageNumber = currentImageIndex + 1; // Para la descripción

        modalImage.src = imageUrl;
        modalImage.alt = `Descripción de la foto ${imageNumber}`;
        modalTitle.textContent = `Descripción de la foto ${imageNumber}`;
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