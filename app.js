const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const remainingCount = document.getElementById('remaining-count');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('[data-filter]');

const STORAGE_KEY = 'todo-list-items';
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let activeFilter = 'all';

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function updateRemainingCount() {
  const count = todos.filter(item => !item.completed).length;
  remainingCount.textContent = `${count} task${count === 1 ? '' : 's'} left`;
}

function createTodoItem(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  if (todo.completed) li.classList.add('completed');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = todo.completed ? '✓' : '○';
  toggle.setAttribute('aria-label', 'Toggle completed');
  toggle.addEventListener('click', () => {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  });

  const text = document.createElement('p');
  text.className = 'todo-text';
  text.textContent = todo.text;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.textContent = '✕';
  remove.setAttribute('aria-label', 'Delete task');
  remove.addEventListener('click', () => {
    li.classList.add('removing');
    li.addEventListener('animationend', () => {
      todos = todos.filter(item => item.id !== todo.id);
      saveTodos();
      renderTodos();
    }, { once: true });
  });

  li.append(toggle, text, remove);
  return li;
}

function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => todoList.appendChild(createTodoItem(todo)));
  updateRemainingCount();
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderTodos();
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ id: Date.now().toString(), text, completed: false });
  saveTodos();
  todoInput.value = '';
  renderTodos();
});

clearCompletedButton.addEventListener('click', () => {
  todos = todos.filter(item => !item.completed);
  saveTodos();
  renderTodos();
});

renderTodos();
