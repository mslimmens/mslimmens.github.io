// Utilidades para LocalStorage
const STORAGE_KEY = 'lista_compras';

function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Renderizar la lista
function renderList() {
  const items = getItems();
  const list = document.getElementById('itemsList');
  list.innerHTML = '';
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'list-group-item' + (item.checked ? ' checked' : '');
    li.innerHTML = `
      <input type="checkbox" class="form-check-input me-2" ${item.checked ? 'checked' : ''} data-idx="${idx}">
      <span class="flex-grow-1">${item.name}</span>
      <button class="btn btn-sm btn-danger ms-auto" data-del="${idx}">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

// Agregar artículo
const form = document.getElementById('addForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('itemInput');
  const name = input.value.trim();
  if (name) {
    const items = getItems();
    items.push({ name, checked: false });
    saveItems(items);
    renderList();
    input.value = '';
  }
});

// Delegación de eventos para check y eliminar
const list = document.getElementById('itemsList');
list.addEventListener('click', function(e) {
  // Marcar/desmarcar
  if (e.target.matches('input[type="checkbox"]')) {
    const idx = e.target.getAttribute('data-idx');
    const items = getItems();
    items[idx].checked = !items[idx].checked;
    saveItems(items);
    renderList();
  }
  // Eliminar
  if (e.target.matches('button[data-del]')) {
    const idx = e.target.getAttribute('data-del');
    const items = getItems();
    items.splice(idx, 1);
    saveItems(items);
    renderList();
  }
});

// Inicializar
renderList(); 