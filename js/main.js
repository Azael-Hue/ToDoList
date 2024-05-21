class Task {
}
window.onload = function () {
    let addTaskButton = document.querySelector("#add-task");
    addTaskButton.onclick = processTask;
};
function processTask() {
    console.log("Add task button was clicked");
    let userTask = getTask();
    if (userTask != null) {
        addTask(userTask);
    }
}
function getTask() {
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
function addTask(t) {
    console.log(t);
}
