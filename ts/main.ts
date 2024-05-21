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

function getTask(): Task {
    clearErrorMessage();
    
    // Get the text from the input element
    let taskTextBox = document.querySelector("#userTask") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate the user input for the task
    let userTask:string = taskTextBox.value;
    if (userTask.trim() == "") {
        isValidData = false;
        let taskErrorSpan = taskTextBox.nextElementSibling;
        taskErrorSpan.textContent = "Please enter a task";
    }

    if (isValidData) {
        // Create a new task
        let addedTask = new Task();
        addedTask.task = userTask;

        return addedTask;
    }

    return null;
}

function addTask(t: Task) {
    console.log(t);

    // Add the task to the page
    let taskDiv:HTMLDivElement =  document.createElement("div");

    // Adds the task to the task div
    let taskElement:HTMLParagraphElement = document.createElement("p");
    taskElement.textContent = t.task;
    taskDiv.appendChild(taskElement);

    // Adds the checkbox to the task in the task div
    let taskElementCheckBox:HTMLInputElement = document.createElement("input");
    taskElementCheckBox.type = "checkbox";
    taskDiv.appendChild(taskElementCheckBox);

    if (taskElementCheckBox.checked) {
        taskElement.style.textDecoration = "line-through";
    }

    document.querySelector("#display-tasks").appendChild(taskDiv);
}

function clearErrorMessage() {
    let errorSpan = document.querySelector("span.error-message");
        errorSpan.textContent = "";
}