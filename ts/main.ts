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
 * and load the tasks from the local storage if there is any
 */
window.onload = function () {
    let addTaskButton = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskButton.onclick = processTask;

    manageStorage('load');
}

/**
 * This function will log itself (for troubleshooting)
 * and get the task the user inputted with the getTask function
 * if the task is not empty it will be added to the list with the addList function
 * and then the text box will be cleared
 */
function processTask() {
    let userTask = getTask();
    if (userTask != null) {
        addTaskToThePage(userTask);
        //addTaskToStorage(userTask);
        manageStorage('add', userTask);
        clearTextBox();
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
    let isValidData: boolean = true;

    // Validate the user input for the task
    let userTask: string = taskTextBox.value;

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
function addTaskToThePage(t: Task) {
    console.log(t);

    // Display the task in cards with a checkbox and a close button
    let displayDiv = document.querySelector("#display-tasks") as HTMLDivElement;
    let taskCard = document.createElement("div") as HTMLDivElement;
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

    let taskElementCheckBox = taskCard.querySelector(".form-check-input") as HTMLInputElement;
    let taskElement = taskCard.querySelector(".card-text") as HTMLElement;

    // checks if the checkbox is checked,
    // if so, it will change the css of the text element to cross it out with a line through
    taskElementCheckBox.addEventListener('change', function () {
        if (taskElementCheckBox.checked) {
            // If the checkbox is checked, cross out the text
            taskElement.style.textDecoration = "line-through";
        } else {
            // If the checkbox is unchecked, remove the line-through
            taskElement.style.textDecoration = "none";
        }
    });

}

// IF CODE DOES NOT PASS, GRAB A PREVIOUS VERSION OF THIS CODE FROM GITHUB COMMITS
// ASK JOE ABOUT THIS FUNCTION ELSE IF's ¿loop? STATEMENT
/**
 * This function will add tasks to the local storage
 * if there is no tasks, the function will create a new array for it
 * if there are tasks in the local storage, it will add the new task to the array
 * @param action the action determines wether it will add or load tasks from the local storage
 * @param task if the action is add, the task will be added to the local storage
 */
function manageStorage(action: string, task?: Task) {
    const TaskStorageKey = "Tasks";
    let taskInfo = localStorage.getItem(TaskStorageKey);
    let tasks: Task[] = taskInfo ? JSON.parse(taskInfo) : [];

    if (action == 'add' && task) {
        tasks.push(task);
        localStorage.setItem(TaskStorageKey, JSON.stringify(tasks));
    } else if (action == 'load') {
        for (let task of tasks) {
            addTaskToThePage(task);
        }
    }
}

/**
 * This function clears the error message in a span
 */
function clearErrorMessage() {
    let errorSpan = document.querySelector(".error-message");
    errorSpan.textContent = "";
}

// clears the task input text box
function clearTextBox() {
    let taskTextBox = document.querySelector("#userTask") as HTMLInputElement;
    taskTextBox.value = "";
}