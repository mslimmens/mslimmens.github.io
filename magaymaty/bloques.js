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

    // Función para crear un elemento de galería
    function createGalleryItem(index) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const anchor = document.createElement('a');
        anchor.href = `${imageFolderPath}${imageBaseName} ${index}${imageExtension}`;
        anchor.setAttribute('data-bs-toggle', 'modal');
        anchor.setAttribute('data-bs-target', '#imageModal');

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
        // Calcula a qué columna le toca añadir la foto
        // (i - 1) para que el índice empiece en 0 para el módulo
        const columnIndex = (i - 1) % columns.length;
        columns[columnIndex].appendChild(galleryItem);
    }

    // Lógica para el modal de Bootstrap (si la tenías en otro lado, muévela aquí)
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const openerLink = event.relatedTarget;
            // Extract info from data-bs-* attributes
            const imageUrl = openerLink.getAttribute('href');
            const imageAlt = openerLink.querySelector('img').getAttribute('alt');

            const modalImage = imageModal.querySelector('#modalImage');
            const modalTitle = imageModal.querySelector('.modal-title');

            modalImage.src = imageUrl;
            modalTitle.textContent = imageAlt;
        });
    }
});