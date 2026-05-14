// Стан додатку (Immutable State)
let state = {
    products: [],
    todos: [],
    filterCategory: 'all',
    sortBy: null
};

// --- ЧИСТІ ФУНКЦІЇ (Pure Functions) ---
const addProduct = (list, product) => {
    const defaultImg = "https://via.placeholder.com/150?text=No+Image";
    return [...list, { 
        ...product, 
        id: Date.now(), 
        img: product.img.trim() || defaultImg,
        created: new Date()
    }];
};

const removeProduct = (list, id) => list.filter(p => p.id !== id);

const getFilteredAndSorted = (list, category, sortBy) => {
    let result = category === 'all' ? [...list] : list.filter(p => p.category === category);
    
    if (sortBy === 'price') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    
    return result;
};

// --- ФУНКЦІЇ UI ТА РЕНДЕРИНГУ ---

const render = () => {
    // Рендер товарів
    const listEl = document.getElementById('products-list');
    const displayed = getFilteredAndSorted(state.products, state.filterCategory, state.sortBy);

    if (displayed.length === 0) {
        listEl.innerHTML = '<p style="grid-column: 1/-1; text-align:center">Наразі список товарів пустий.</p>';
    } else {
        listEl.innerHTML = displayed.map(p => `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Ціна: ${p.price} грн</p>
                <p><small>Категорія: ${p.category}</small></p>
                <button onclick="handleDelete(${p.id})">Видалити</button>
            </div>
        `).join('');
    }

    // Рендер Todo (Завдання 2)
    const todoListEl = document.getElementById('todo-list');
    todoListEl.innerHTML = state.todos.map(t => `
        <li class="${t.done ? 'todo-done' : ''}">
            <span onclick="toggleTodo(${t.id})" style="cursor:pointer">${t.text}</span>
            <button onclick="deleteTodo(${t.id})" style="background:red; color:white; border:none; padding:5px; border-radius:3px; margin-left:10px;">Видалити</button>
        </li>
    `).join('');

    // Оновлення загальної ціни
    document.getElementById('total-price').innerText = state.products.reduce((s, p) => s + Number(p.price), 0);
};

// --- ГЛОБАЛЬНІ ОБРОБНИКИ (Actions) ---

window.setFilter = (cat) => { state.filterCategory = cat; render(); };
window.setSort = (type) => { state.sortBy = type; render(); };
window.resetFilters = () => { state.filterCategory = 'all'; state.sortBy = null; render(); };

window.openModal = () => {
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').style.display = 'flex';
};
window.closeModal = () => document.getElementById('product-modal').style.display = 'none';

window.handleDelete = (id) => {
    state.products = removeProduct(state.products, id);
    showToast("Товар успішно видалено");
    render();
};

const showToast = (msg) => {
    const s = document.getElementById("snackbar");
    s.innerText = msg;
    s.className = "show";
    setTimeout(() => { s.className = ""; }, 3000);
};

// --- TODO ЛОГІКА (Завдання 2) ---
window.toggleTodo = (id) => {
    state.todos = state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    render();
};

window.deleteTodo = (id) => {
    state.todos = state.todos.filter(t => t.id !== id);
    render();
};

window.sortTodos = (criteria) => {
    if (criteria === 'status') state.todos.sort((a, b) => a.done - b.done);
    if (criteria === 'date') state.todos.sort((a, b) => b.id - a.id);
    render();
};

// Ініціалізація подій
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('product-form').onsubmit = (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('p-name').value,
            price: document.getElementById('p-price').value,
            category: document.getElementById('p-category').value,
            img: document.getElementById('p-img').value
        };
        state.products = addProduct(state.products, data);
        window.closeModal();
        render();
    };

    document.getElementById('todo-form').onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('todo-input');
        state.todos = [...state.todos, { id: Date.now(), text: input.value, done: false }];
        input.value = '';
        render();
    };
    
    render();
});