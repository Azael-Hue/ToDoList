class Task {
}
window.onload = function () {
    let addTaskButton = document.querySelector("#add-task");
    addTaskButton.onclick = processTask;
    manageStorage('load');
};
function processTask() {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToThePage(userTask);
        manageStorage('add', userTask);
        clearTextBox();
    }
}
function getTask() {
    clearErrorMessage();
    let taskTextBox = document.querySelector("#userTask");
    let isValidData = true;
    let userTask = taskTextBox.value;
    if (userTask.trim() == "") {
        isValidData = false;
        let taskErrorSpan = taskTextBox.nextElementSibling;
        taskErrorSpan.textContent = "Please enter a task";
    }
    if (isValidData) {
        let addedTask = new Task();
        addedTask.task = userTask;
        return addedTask;
    }
    return null;
}
function addTaskToThePage(t) {
    console.log(t);
    let displayDiv = document.querySelector("#display-tasks");
    let taskCard = document.createElement("div");
    taskCard.className = "col-sm-12 col-md-6 col-lg-4 mb-3 mx-auto";
    taskCard.innerHTML =
        `
        <div class="card" style="width: 18rem">
            <button type="button" class="btn-close" aria-label="close"></button>
            <img src="https://placehold.co/250" class="card-img-top" alt="Just a blank placeholder">
            <div class="card-body">
                <h5 class="card-title">Task</h5>
                <p class="card-text">${t.task}</p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="check${t.task}">
                    <label class="form-check-label" for="check${t.task}">
                        Completed
                    </label>
                </div>       
            </div>
        </div>
    `;
    displayDiv.appendChild(taskCard);
    let taskElementCheckBox = taskCard.querySelector(".form-check-input");
    let taskElement = taskCard.querySelector(".card-text");
    taskElementCheckBox.addEventListener('change', function () {
        if (taskElementCheckBox.checked) {
            taskElement.style.textDecoration = "line-through";
        }
        else {
            taskElement.style.textDecoration = "none";
        }
    });
}
function manageStorage(action, task) {
    const TaskStorageKey = "Tasks";
    let taskInfo = localStorage.getItem(TaskStorageKey);
    let tasks = taskInfo ? JSON.parse(taskInfo) : [];
    if (action == 'add' && task) {
        tasks.push(task);
        localStorage.setItem(TaskStorageKey, JSON.stringify(tasks));
    }
    else if (action == 'load') {
        for (let task of tasks) {
            addTaskToThePage(task);
        }
    }
}
function clearErrorMessage() {
    let errorSpan = document.querySelector(".error-message");
    errorSpan.textContent = "";
}
function clearTextBox() {
    let taskTextBox = document.querySelector("#userTask");
    taskTextBox.value = "";
}
