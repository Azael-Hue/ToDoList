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
