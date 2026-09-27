// -----------------------------
// SUPABASE SETUP
// -----------------------------

const SUPABASE_URL = "https://bduvcnpyaivjoxtbldcn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_d-sSCBE2ZW_YQSbbyv2KKQ_GGLZTwnt";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// -----------------------------
// HTML ELEMENTS
// -----------------------------

const taskInput = document.querySelector("input");
const addTaskButton = document.querySelector(".task-form button");
const taskList = document.querySelector("ul");


// -----------------------------
// LOAD TASKS FROM DATABASE
// -----------------------------

async function loadTasks() {

    const { data, error } = await db
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading tasks:", error);
        return;
    }

    taskList.innerHTML = "";

    data.forEach(function (task) {
        displayTask(task);
    });
}


// -----------------------------
// ADD A TASK
// -----------------------------

async function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const { data, error } = await db
        .from("tasks")
        .insert([
            {
                task: taskText,
                completed: false
            }
        ])
        .select();

    if (error) {
        console.error("Error adding task:", error);
        alert("There was a problem adding the task.");
        return;
    }

    taskInput.value = "";

    await loadTasks();
}


// -----------------------------
// DISPLAY A TASK
// -----------------------------

function displayTask(task) {

    const newTask = document.createElement("li");

    const taskName = document.createElement("span");
    taskName.textContent = task.task;

    if (task.completed) {
        taskName.style.textDecoration = "line-through";
    }


    // COMPLETE BUTTON
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";

    completeButton.addEventListener("click", async function () {

        const newCompletedStatus = !task.completed;

        const { error } = await db
            .from("tasks")
            .update({
                completed: newCompletedStatus
            })
            .eq("id", task.id);

        if (error) {
            console.error("Error updating task:", error);
            alert("There was a problem updating the task.");
            return;
        }

        await loadTasks();
    });


    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", async function () {

        const updatedTask = prompt(
            "Edit your task:",
            task.task
        );

        if (
            updatedTask === null ||
            updatedTask.trim() === ""
        ) {
            return;
        }

        const { error } = await db
            .from("tasks")
            .update({
                task: updatedTask.trim()
            })
            .eq("id", task.id);

        if (error) {
            console.error("Error editing task:", error);
            alert("There was a problem editing the task.");
            return;
        }

        await loadTasks();
    });


    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {

        const { error } = await db
            .from("tasks")
            .delete()
            .eq("id", task.id);

        if (error) {
            console.error("Error deleting task:", error);
            alert("There was a problem deleting the task.");
            return;
        }

        await loadTasks();
    });


    // ADD EVERYTHING TO THE PAGE
    newTask.appendChild(taskName);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
}


// -----------------------------
// BUTTON EVENTS
// -----------------------------

addTaskButton.addEventListener("click", addTask);


// Add task by pressing Enter
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// -----------------------------
// LOAD TASKS WHEN PAGE OPENS
// -----------------------------

loadTasks();
