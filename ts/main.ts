/**
 * Create a new class for a task
 */
class Task {
    task: string;
}

/**
 * when the windows loads, 
 * allow the user to click the
 * button which will trigger
 * the processTask function
 */
window.onload = function() {
    let addTaskButton = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskButton.onclick = processTask;
}

/**
 * This function will log itself (for troubleshooting)
 * and get the task the user inputted with the getTask function
 * if the task is not empty it will be added to the list with the addList function
 */
function processTask() {
    console.log("Add task button was clicked");

    let userTask = getTask();
    if (userTask != null) {
        addTask(userTask);
    }
}

/**
 * this function get the text from the text box and checks if the data string is valid to be processed through
 * if the text box is empty display an error message
 * @returns the user input as a new task class if the text box is not empty, otherwise Null
 */
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

/**
 * this function will take in the task that was validated and displays it with a checkbox to its side to be cleared
 * @param t takes in the task that was validated from getTask
 */
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

    // checks if the checkbox is checked,
    // if so, it will change the css of the text element to cross it out with a line through
    taskElementCheckBox.addEventListener('change', function() {
        if (taskElementCheckBox.checked) {
            // If the checkbox is checked, cross out the text
            taskElement.style.textDecoration = "line-through";
        } else {
            // If the checkbox is unchecked, remove the line-through
            taskElement.style.textDecoration = "none";
        }
    });

    // Display the task in the HTML div similarly to a list
    document.querySelector("#display-tasks").appendChild(taskDiv);
}

/**
 * This function clears the error message in a span
 */
function clearErrorMessage() {
    let errorSpan = document.querySelector(".error-message");
    errorSpan.textContent = "";
}