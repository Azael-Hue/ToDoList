class Task {
    task: string;
}

window.onload = function() {
    let addTaskButton = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskButton.onclick = processTask;
}

function processTask() {
    console.log("Add task button was clicked");

    let userTask = getTask();
    if (userTask != null) {
        addTask(userTask);
    }
}

