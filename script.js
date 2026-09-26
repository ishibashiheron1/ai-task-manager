const taskInput = document.querySelector("input");
const addTaskButton = document.querySelector("button");
const taskList = document.querySelector("ul");

// Remove example task when page loads
taskList.innerHTML = "";

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = document.createElement("li");

    const taskName = document.createElement("span");
    taskName.textContent = taskText;

    // Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", function () {
        if (taskName.style.textDecoration === "line-through") {
            taskName.style.textDecoration = "none";
        } else {
            taskName.style.textDecoration = "line-through";
        }
    });

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function () {
        const updatedTask = prompt("Edit your task:", taskName.textContent);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            taskName.textContent = updatedTask.trim();
        }
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        newTask.remove();
    });

    newTask.appendChild(taskName);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    taskInput.value = "";
}

// Add task using button
addTaskButton.addEventListener("click", addTask);

// Add task by pressing Enter
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
