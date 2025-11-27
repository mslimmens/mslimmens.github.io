const LISTA_STORAGE_KEY = 'listaSupermercado';
const listaContainer = document.getElementById('listaContainer');
const botonLimpiar = document.getElementById('limpiarLista');
const elementoCargando = document.getElementById('cargando');
let listaProductos = []; // Almacena la lista actual en memoria

/**
 * 1. Inicializa la lista: Carga desde LocalStorage o desde el JSON base.
 */
async function inicializarLista() {
    // Intentar cargar la lista guardada en el navegador
    const datosGuardados = localStorage.getItem(LISTA_STORAGE_KEY);
    
    if (datosGuardados) {
        // Opción 1: Hay datos guardados, cargarlos
        listaProductos = JSON.parse(datosGuardados);
        console.log("Lista cargada desde LocalStorage.");
    } else {
        // Opción 2: No hay datos, cargar la lista base (JSON)
        try {
            const response = await fetch('lista_base.json');
            listaProductos = await response.json();
            console.log("Lista cargada desde lista_base.json.");
            // Guardar la base en LocalStorage para la próxima vez
            guardarLista();
        } catch (error) {
            console.error("Error al cargar la lista base:", error);
            listaContainer.innerHTML = "<p>Error: No se pudo cargar la lista inicial.</p>";
            return;
        }
    }

    // Una vez cargada, renderizarla
    renderizarLista();
}

/**
 * 2. Guarda la lista actual en el LocalStorage.
 */
function guardarLista() {
    try {
        const listaJSON = JSON.stringify(listaProductos);
        localStorage.setItem(LISTA_STORAGE_KEY, listaJSON);
        console.log("Lista guardada en LocalStorage.");
    } catch (e) {
        console.error("No se pudo guardar la lista en LocalStorage:", e);
        // Esto puede pasar si el LocalStorage está lleno (raro)
    }
}

/**
 * 3. Dibuja (renderiza) la lista en el DOM.
 */
function renderizarLista() {
    listaContainer.innerHTML = ''; // Limpiar el contenedor
    if (elementoCargando) elementoCargando.style.display = 'none';

    listaProductos.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `item-lista ${producto.comprado ? 'comprado' : ''}`;
        itemDiv.dataset.id = producto.id;

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = producto.comprado;
        checkbox.addEventListener('change', manejarCheck);

        // Texto del producto
        const textoSpan = document.createElement('span');
        textoSpan.className = 'item-texto';
        textoSpan.textContent = producto.nombre;

        itemDiv.appendChild(textoSpan);
        itemDiv.appendChild(checkbox);
        listaContainer.appendChild(itemDiv);
    });
}

/**
 * 4. Maneja el evento cuando se marca/desmarca un producto.
 */
function manejarCheck(event) {
    const checkbox = event.target;
    const itemDiv = checkbox.closest('.item-lista');
    const productoId = itemDiv.dataset.id;
    const estaComprado = checkbox.checked;

    // 1. Actualizar el estado en el array de la memoria (listaProductos)
    const producto = listaProductos.find(p => p.id === productoId);
    if (producto) {
        producto.comprado = estaComprado;
    }

    // 2. Aplicar/Quitar el estilo 'comprado'
    if (estaComprado) {
        itemDiv.classList.add('comprado');
    } else {
        itemDiv.classList.remove('comprado');
    }

    // 3. Guardar el estado actualizado en LocalStorage
    guardarLista();
}

/**
 * 5. Maneja el evento del botón de Limpiar/Reiniciar.
 */
function limpiarReiniciar() {
    if (confirm("¿Estás seguro que deseas reiniciar la lista? Se perderán todos los checks actuales.")) {
        // Borrar todo del LocalStorage
        localStorage.removeItem(LISTA_STORAGE_KEY);
        // Recargar la página para forzar la carga del JSON base
        window.location.reload();
    }
}

// ------------------------------------------
// INICIO DE LA APLICACIÓN
// ------------------------------------------

// 1. Asignar el evento al botón de limpiar
botonLimpiar.addEventListener('click', limpiarReiniciar);

// 2. Iniciar el proceso de carga
inicializarLista();