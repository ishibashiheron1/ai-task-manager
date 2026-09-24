const taskInput = document.querySelector("input");
const addTaskButton = document.querySelector("button");
const taskList = document.querySelector("ul");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    taskList.appendChild(newTask);

    taskInput.value = "";
}

addTaskButton.addEventListener("click", addTask);
