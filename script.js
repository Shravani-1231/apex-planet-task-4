let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");
    let priorityInput = document.getElementById("priorityInput");

    let taskText = taskInput.value.trim();

    // Empty validation
    if (taskText === "") {

        alert("Please enter a task");
        return;
    }

    // Character limit
    if (taskText.length > 50) {

        alert("Task must be below 50 characters");
        return;
    }

    // Duplicate check
    let duplicate = tasks.some(task =>
        task.text.toLowerCase() === taskText.toLowerCase()
    );

    if (duplicate) {

        alert("Task already exists");
        return;
    }

    // Create task object
    let task = {

        text: taskText,
        date: dateInput.value || "No Date",
        priority: priorityInput.value,
        completed: false
    };

    // Add task
    tasks.push(task);

    // Save to local storage
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    // Clear input
    taskInput.value = "";
    dateInput.value = "";

    // Refresh tasks
    displayTasks();
}


function displayTasks(filteredTasks = tasks) {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {

        let li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");
        }

        li.innerHTML = `

            <h3>${task.text}</h3>

            <p>📅 ${task.date}</p>

            <p>🔥 Priority: ${task.priority}</p>

            <div class="task-buttons">

                <button onclick="completeTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateTaskCount();
}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}


function deleteTask(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {

        tasks.splice(index, 1);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        displayTasks();
    }
}


function editTask(index) {

    let newTask = prompt(
        "Edit Task",
        tasks[index].text
    );

    if (newTask !== null &&
        newTask.trim() !== "") {

        tasks[index].text = newTask;

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        displayTasks();
    }
}


function searchTask() {

    let searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let filteredTasks = tasks.filter(task =>

        task.text.toLowerCase()
        .includes(searchValue)

    );

    displayTasks(filteredTasks);
}


function filterTasks(type) {

    if (type === "completed") {

        displayTasks(
            tasks.filter(task => task.completed)
        );
    }

    else if (type === "pending") {

        displayTasks(
            tasks.filter(task => !task.completed)
        );
    }

    else {

        displayTasks(tasks);
    }
}


function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");
}


function updateTaskCount() {

    let completedTasks = tasks.filter(
        task => task.completed
    ).length;

    document.getElementById("taskCount").innerHTML =

        `Total Tasks: ${tasks.length}
         | Completed: ${completedTasks}`;
}