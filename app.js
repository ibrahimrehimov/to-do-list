let inputVisible = true;

function toggleInput() {
    const inputContainer = document.getElementById('inputContainer');
    const input = document.getElementById('taskInput');
    const todoContainer = document.querySelector('.todo-container');

    if (!inputVisible) {
        inputContainer.style.display = 'block';
        inputContainer.classList.add('show');
        todoContainer.classList.remove('hide');
        todoContainer.classList.add('growContainer');
        input.focus();
    } else {
        inputContainer.classList.remove('show');
        setTimeout(() => {
            inputContainer.style.display = 'none';
        }, 500);
        todoContainer.classList.remove('growContainer');
        todoContainer.classList.add('hide');
    }

    inputVisible = !inputVisible;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    const taskList = document.getElementById('taskList');

    if (taskText === "") {
        showWarningMessage("Tapşırıq boş ola bilməz.");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-text">${taskText}</div>
        <button class="delete-btn" onclick="removeTask(this)">✕</button>
    `;
    taskList.appendChild(li);
    taskList.style.display = 'block';

    input.value = "";
    document.getElementById('inputContainer').style.display = 'none';
    inputVisible = false;
}

function removeTask(button) {
    const li = button.parentElement;
    li.classList.add('removed');
    setTimeout(() => {
        li.remove();
        const taskList = document.getElementById('taskList');
        if (taskList.children.length === 0) {
            taskList.style.display = 'none';
        }
    }, 500);
}

function clearInput() {
    document.getElementById('taskInput').value = "";
}

document.getElementById('taskInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

let sortAsc = true;

function toggleSort() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children);
    const icon = document.getElementById('sortIcon');

    tasks.sort((a, b) => {
        const textA = a.querySelector('.task-text').textContent.trim().toLowerCase();
        const textB = b.querySelector('.task-text').textContent.trim().toLowerCase();
        return sortAsc ? textA.localeCompare(textB) : textB.localeCompare(textA);
    });

    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));

    if (sortAsc) {
        icon.classList.remove('fa-arrow-down-a-z');
        icon.classList.add('fa-arrow-up-a-z');
    } else {
        icon.classList.remove('fa-arrow-up-a-z');
        icon.classList.add('fa-arrow-down-a-z');
    }

    sortAsc = !sortAsc;
}

function showWarningMessage(message) {
    const warningDiv = document.createElement('div');
    warningDiv.classList.add('warning-message');
    warningDiv.textContent = message;
    document.body.appendChild(warningDiv);
    setTimeout(() => warningDiv.remove(), 3000);
}