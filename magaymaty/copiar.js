// --- Lógica para Copiar CBU ---
const cbuNumberSpan = document.getElementById('cbuNumber');
const copyButton = document.querySelector('.copy-button');
const cbuCopyMessage = document.getElementById('cbuCopyMessage');

if (cbuNumberSpan && copyButton && cbuCopyMessage) {
    copyButton.addEventListener('click', function() {
        const cbuText = cbuNumberSpan.textContent.replace('Alias: ', '').trim(); // Extrae solo el número del CBU

        // Utiliza la API del Portapapeles (Clipboard API)
        navigator.clipboard.writeText(cbuText)
            .then(() => {
                cbuCopyMessage.textContent = '¡Copiado!';
                cbuCopyMessage.classList.add('show');
                setTimeout(() => {
                    cbuCopyMessage.classList.remove('show');
                    cbuCopyMessage.textContent = ''; // Limpia el texto después de la transición
                }, 2000); // El mensaje se oculta después de 2 segundos
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
                alert('No se pudo copiar el CBU automáticamente. Por favor, cópialo manualmente: ' + cbuText);
            });
    });
}