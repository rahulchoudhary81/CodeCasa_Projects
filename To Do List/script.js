const tasksList = document.getElementById("tasks");
const noPendingTasksMessage = document.getElementById("noPendingTasksMessage");
const noCompletedTasksMessage = document.getElementById("noCompletedTasksMessage");

function addTask() {
    const taskText = document.getElementById("newTask").value;
    if (taskText.trim() !== "") {
        const taskItem = document.createElement("li");
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.onclick = toggleTaskStatus;
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.onclick = editTask;
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = deleteTask;
        taskItem.appendChild(taskCheckbox);
        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = taskText;
        taskItem.appendChild(taskTextElement);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        tasksList.appendChild(taskItem);
        document.getElementById("newTask").value = "";
        showMessages(false, false);
    }
}

function toggleTaskStatus() {
    const taskItem = this.parentElement;
    if (this.checked) {
        taskItem.classList.add("completed-task");
    } else {
        taskItem.classList.remove("completed-task");
    }
}

function editTask() {
    const taskItem = this.parentElement;
    const taskTextElement = taskItem.querySelector("span");
    const updatedText = prompt("Edit task:", taskTextElement.textContent);
    if (updatedText !== null) {
        taskTextElement.textContent = updatedText;
    }
}

function deleteTask() {
    const taskItem = this.parentElement;
    taskItem.remove();
    updateMessages();
}

function showAllTasks() {
    const allTasks = tasksList.querySelectorAll("li");
    allTasks.forEach(taskItem => taskItem.style.display = "flex");
    setActiveFilter('all');
    showMessages(false, false);
    noPendingTasksMessage.style.display = "none";
    noCompletedTasksMessage.style.display = "none";
}

function showPendingTasks() {
    const completedTasks = tasksList.querySelectorAll(".completed-task");
    const pendingTasks = tasksList.querySelectorAll("li:not(.completed-task)");
    noPendingTasksMessage.style.display = "none";

    if (pendingTasks.length === 0) {
        showMessages(true, false);
        noPendingTasksMessage.style.display = "block";
    } else {
        showMessages(false, false);
    }

    setActiveFilter('pending');
    completedTasks.forEach(taskItem => taskItem.style.display = "none");
    pendingTasks.forEach(taskItem => taskItem.style.display = "flex");
}

function showCompletedTasks() {
    const pendingTasks = tasksList.querySelectorAll("li:not(.completed-task)");
    const completedTasks = tasksList.querySelectorAll(".completed-task");
    noCompletedTasksMessage.style.display = "none";

    if (completedTasks.length === 0) {
        showMessages(false, true);
        noCompletedTasksMessage.style.display = "block";
    } else {
        showMessages(false, false);
    }

    setActiveFilter('completed');
    pendingTasks.forEach(taskItem => taskItem.style.display = "none");
    completedTasks.forEach(taskItem => taskItem.style.display = "flex");
}

function setActiveFilter(filter) {
    const filterElements = document.querySelectorAll(".filters span");
    filterElements.forEach(element => element.classList.remove("active"));

    const selectedFilter = document.getElementById(filter);
    if (selectedFilter) {
        selectedFilter.classList.add("active");
    }
}

function clearAllTasks() {
    tasksList.innerHTML = "";
    showMessages(false, false);
}

function showMessages(showPending, showCompleted) {
    if (showPending) {
        noPendingTasksMessage.style.display = "block";
    } else {
        noPendingTasksMessage.style.display = "none";
    }

    if (showCompleted) {
        noCompletedTasksMessage.style.display = "block";
    } else {
        noCompletedTasksMessage.style.display = "none";
    }
}

function updateMessages() {
    const completedTasks = tasksList.querySelectorAll(".completed-task");
    const pendingTasks = tasksList.querySelectorAll("li:not(.completed-task)");

    if (completedTasks.length === 0) {
        showMessages(false, true);
    } else if (pendingTasks.length === 0) {
        showMessages(true, false);
    } else {
        showMessages(false, false);
    }
}