document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para la Pantalla de Carga (Preloader) ---
    const pantallaCarga = document.getElementById('pantalla-carga');
    const body = document.body;

    // Define el tiempo mínimo en milisegundos que la pantalla de carga debe mostrarse
    const tiempoMinimoMilisegundos = 4000; // Volvemos a 3 segundos para que se vea bien el efecto

    let recursosCargados = false;
    let tiempoMinimoCumplido = false;

    // Función para generar símbolos aleatorios
    function generarSimbolos() {
        const tiposSimbolo = ['corazon', 'estrella'];
        const numSimbolos = 20; // Aumentamos un poco el número de símbolos
        const duracionAnimacionBase = 5000; // Duración base en milisegundos

        for (let i = 0; i < numSimbolos; i++) {
            const simbolo = document.createElement('div');
            const tipoAleatorio = tiposSimbolo[Math.floor(Math.random() * tiposSimbolo.length)];

            simbolo.classList.add('simbolo-carga');
            simbolo.classList.add('simbolo-' + tipoAleatorio);

            // Contenido del símbolo (carácter Unicode para corazón o estrella)
            if (tipoAleatorio === 'corazon') {
                simbolo.innerHTML = '❤'; // Unicode para corazón
            } else {
                simbolo.innerHTML = '⭐'; // Unicode para estrella
            }

            // Posición aleatoria inicial (más centrada en la pantalla de carga)
            const posX = Math.random() * 80 + 10; // entre 10% y 90% del ancho
            const posY = Math.random() * 80 + 10; // entre 10% y 90% del alto
            simbolo.style.left = `${posX}%`;
            simbolo.style.top = `${posY}%`;

            // Rotación aleatoria inicial
            const rotacionAleatoria = Math.random() * 360;
            // No establecemos el scale(0) aquí, la animación en CSS lo manejará
            simbolo.style.transform = `rotate(${rotacionAleatoria}deg)`; // Solo rotación inicial

            // Retraso de animación aleatorio
            const retrasoAnimacion = Math.random() * (duracionAnimacionBase / 1.5); // Hasta 2/3 de la duración total
            simbolo.style.animationDelay = `${retrasoAnimacion}ms`;
            // Aseguramos que la duración total de la animación no sea cero
            const duracionRealAnimacion = duracionAnimacionBase - retrasoAnimacion;
            simbolo.style.animationDuration = `${duracionRealAnimacion > 500 ? duracionRealAnimacion : 500}ms`; // Mínimo 500ms

            pantallaCarga.appendChild(simbolo); // Añade el símbolo a la pantalla de carga
        }
    }

    // Llama a la función para generar los símbolos cuando la pantalla de carga se inicializa
    generarSimbolos();

    // ... (El resto de tu lógica para la pantalla de carga, botones, etc. se mantiene igual) ...

    // 1. Marcar cuando todos los recursos (imágenes, etc.) estén cargados
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
        if (recursosCargados && tiempoMinimoCumplido) {
            console.log('Ocultando pantalla de carga...');
            pantallaCarga.classList.add('oculto');

            pantallaCarga.addEventListener('transitionend', function() {
                pantallaCarga.style.display = 'none';
                body.classList.add('cargado');
            }, { once: true });
        }
    }

    // --- Lógica del Botón de Subida de Formulario (Antiguo showUploadFormBtn) ---
    const showUploadFormBtn = document.getElementById('showUploadFormBtn');
    const megaUploadContainer = document.querySelector('.mega-upload-container');

    if (showUploadFormBtn && megaUploadContainer) {
        showUploadFormBtn.addEventListener('click', function() {
            megaUploadContainer.classList.toggle('hidden');
            if (megaUploadContainer.classList.contains('hidden')) {
                this.textContent = 'Subir Fotos y Videos';
            } else {
                this.textContent = 'Ocultar Formulario';
            }
        });
    }

    // --- Lógica del Botón para Abrir Nueva Ventana ---
    const openUploadModalBtn = document.getElementById('openUploadModalBtn');

    if (openUploadModalBtn) {
        openUploadModalBtn.addEventListener('click', function() {
            window.open('https://mega.nz/filerequest/nzQT3zwEWKQ', '_blank');
        });
    }

    const openUploadModalBtn2 = document.getElementById('openUploadModalBtn2');

    if (openUploadModalBtn2) {
        openUploadModalBtn2.addEventListener('click', function() {
            window.open('https://mega.nz/filerequest/nzQT3zwEWKQ', '_blank');
        });
    }

    console.log('La lógica principal de la página del casamiento ha sido inicializada.');
});
