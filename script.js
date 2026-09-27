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

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");

const authSection = document.getElementById("auth-section");
const userSection = document.getElementById("user-section");

const authMessage = document.getElementById("auth-message");
const userEmail = document.getElementById("user-email");

const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");


// -----------------------------
// SIGN UP
// -----------------------------

async function signUp() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {
        authMessage.textContent = "Please enter an email and password.";
        return;
    }

    const { data, error } = await db.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent =
        "Account created! Check your email if confirmation is required.";

    console.log("Sign up successful:", data);
}


// -----------------------------
// LOG IN
// -----------------------------

async function logIn() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === "" || password === "") {
        authMessage.textContent = "Please enter an email and password.";
        return;
    }

    const { data, error } = await db.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent = "";
    showLoggedInUser(data.user);
}


// -----------------------------
// LOG OUT
// -----------------------------

async function logOut() {
    const { error } = await db.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    showLoggedOutUser();
}


// -----------------------------
// SHOW LOGGED-IN PAGE
// -----------------------------

function showLoggedInUser(user) {
    authSection.style.display = "none";
    userSection.style.display = "block";

    userEmail.textContent = user.email;

    loadTasks();
}


// -----------------------------
// SHOW LOGGED-OUT PAGE
// -----------------------------

function showLoggedOutUser() {
    authSection.style.display = "block";
    userSection.style.display = "none";

    userEmail.textContent = "";
    taskList.innerHTML = "";
}


// -----------------------------
// CHECK LOGIN STATUS
// -----------------------------

async function checkUser() {
    const {
        data: { session }
    } = await db.auth.getSession();

    if (session && session.user) {
        showLoggedInUser(session.user);
    } else {
        showLoggedOutUser();
    }
}


// -----------------------------
// LOAD ONLY CURRENT USER'S TASKS
// -----------------------------

async function loadTasks() {
    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        taskList.innerHTML = "";
        return;
    }

    const { data, error } = await db
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
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
// ADD TASK FOR CURRENT USER
// -----------------------------

async function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        alert("Please log in first.");
        return;
    }

    const { error } = await db
        .from("tasks")
        .insert([
            {
                task: taskText,
                completed: false,
                user_id: user.id
            }
        ]);

    if (error) {
        console.error("Error adding task:", error);
        alert("There was a problem adding the task.");
        return;
    }

    taskInput.value = "";
    await loadTasks();
}


// -----------------------------
// DISPLAY TASK
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
    completeButton.textContent =
        task.completed ? "Undo" : "Complete";

    completeButton.addEventListener("click", async function () {
        const {
            data: { user }
        } = await db.auth.getUser();

        if (!user) {
            return;
        }

        const { error } = await db
            .from("tasks")
            .update({
                completed: !task.completed
            })
            .eq("id", task.id)
            .eq("user_id", user.id);

        if (error) {
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

        const {
            data: { user }
        } = await db.auth.getUser();

        if (!user) {
            return;
        }

        const { error } = await db
            .from("tasks")
            .update({
                task: updatedTask.trim()
            })
            .eq("id", task.id)
            .eq("user_id", user.id);

        if (error) {
            alert("There was a problem editing the task.");
            return;
        }

        await loadTasks();
    });


    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", async function () {
        const {
            data: { user }
        } = await db.auth.getUser();

        if (!user) {
            return;
        }

        const { error } = await db
            .from("tasks")
            .delete()
            .eq("id", task.id)
            .eq("user_id", user.id);

        if (error) {
            alert("There was a problem deleting the task.");
            return;
        }

        await loadTasks();
    });


    // ADD TASK TO PAGE
    newTask.appendChild(taskName);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
}


// -----------------------------
// BUTTON EVENTS
// -----------------------------

signupButton.addEventListener("click", signUp);
loginButton.addEventListener("click", logIn);
logoutButton.addEventListener("click", logOut);
addTaskButton.addEventListener("click", addTask);


// Press Enter to add task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// -----------------------------
// AUTH STATE CHANGES
// -----------------------------

db.auth.onAuthStateChange(function (event, session) {
    if (session && session.user) {
        showLoggedInUser(session.user);
    } else {
        showLoggedOutUser();
    }
});


// -----------------------------
// START APP
// -----------------------------

checkUser();
