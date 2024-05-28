class Task {
}
window.onload = function () {
    let addTaskButton = document.querySelector("#add-task");
    addTaskButton.onclick = processTask;
};
function processTask() {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToThePage(userTask);
        addTaskToStorage(userTask);
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
    let taskDiv = document.createElement("div");
    let taskElement = document.createElement("p");
    taskElement.textContent = t.task;
    taskDiv.appendChild(taskElement);
    let taskElementCheckBox = document.createElement("input");
    taskElementCheckBox.type = "checkbox";
    taskDiv.appendChild(taskElementCheckBox);
    taskElementCheckBox.addEventListener('change', function () {
        if (taskElementCheckBox.checked) {
            taskElement.style.textDecoration = "line-through";
        }
        else {
            taskElement.style.textDecoration = "none";
        }
    });
    let displayDiv = document.querySelector("#display-tasks");
    displayDiv.innerHTML +=
        `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 mx-auto">
                <div class="card" style="width: 18rem">
                    <button type="button" class="btn-close" aria-label="close"></button>
                    <img src="https://placehold.co/250" class="card-img-top" alt="Just a blank placeholder">
                    <div class="card-body">
                        <h5 class="card-title"> Task: ${t.task} </h5>
                        
                    </div>
                </div>
            </div>
        `;
}
function addTaskToStorage(t) {
    const TaskStorageKey = "Tasks";
    let taskInfo = localStorage.getItem(TaskStorageKey);
    let tasks = taskInfo ? JSON.parse(taskInfo) : [];
    tasks.push(t);
    taskInfo = JSON.stringify(tasks);
    localStorage.setItem(TaskStorageKey, taskInfo);
}
function clearErrorMessage() {
    let errorSpan = document.querySelector(".error-message");
    errorSpan.textContent = "";
}
