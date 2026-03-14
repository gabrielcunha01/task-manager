let tasks = JSON.parse(localStorage.getItem('dev_tasks')) || [];
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

function renderTasks(filter = 'all') {
    list.innerHTML = '';
    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="removeTask(${task.id})">Excluir</button>
        `;
        list.appendChild(li);
    });
    localStorage.setItem('dev_tasks', JSON.stringify(tasks));
}

document.getElementById('addBtn').onclick = () => {
    if (!input.value) return;
    tasks.push({ id: Date.now(), text: input.value, completed: false });
    input.value = '';
    renderTasks();
};

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    renderTasks();
}

function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
    };
});

renderTasks();