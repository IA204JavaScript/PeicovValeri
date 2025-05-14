let tasks = [];
let filter = 'all';

document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('taskInput');
  const error = document.getElementById('error');
  const text = input.value.trim();
  if (text === '') {
    error.textContent = 'Поле не может быть пустым';
    return;
  }
  error.textContent = '';
  tasks.push({ id: Date.now(), text, completed: false });
  input.value = '';
  renderTasks();
});

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const newText = prompt('Изменить задачу:');
  if (newText !== null) {
    const task = tasks.find(t => t.id === id);
    if (task) task.text = newText.trim() || task.text;
    renderTasks();
  }
}

function filterTasks(status) {
  filter = status;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  list.innerHTML = '';

  tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(searchText))
    .forEach(task => {
      const div = document.createElement('div');
      div.className = 'task' + (task.completed ? ' completed' : '');
      div.innerHTML = `
        <span onclick="toggleComplete(${task.id})">${task.text}</span>
        <div>
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      `;
      list.appendChild(div);
    });
}
