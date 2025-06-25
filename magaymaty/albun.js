document.addEventListener('DOMContentLoaded', function () {
    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que disparó el modal
        const imageUrl = button.getAttribute('href');
        const imageAlt = button.querySelector('img').getAttribute('alt');

        const modalImage = imageModal.querySelector('#modalImage');
        const modalTitle = imageModal.querySelector('#imageModalLabel');

        modalImage.src = imageUrl;
        modalTitle.textContent = imageAlt;
    });
});