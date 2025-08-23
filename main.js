

const inputTask = document.getElementById("task");
const submitTask = document.getElementById("add");
const tasksContainer = document.getElementById("tasks");

let tasks = [];


if (window.localStorage.getItem("tasks")) {
    tasks = JSON.parse(window.localStorage.getItem("tasks"));
    renderTasks();
}


submitTask.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputTask.value) {
        const task = {
            id: Date.now(),
            title: inputTask.value,
            completed: false,
        }
        tasks.push(task);
        inputTask.value = "";
        renderTasks();
        saveTasks();
    } else {
        alert("Please enter a task");
    }
});

function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = task.title;
        li.innerHTML = `
        <span onclick="chackTask(this, ${task.id})" class="${task.completed ? 'chack' : ''}">${task.title}</span>
        <button class="delete" onclick="deleteTask(${task.id})">X</button>`;
        tasksContainer.prepend(li);
    })

};

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
}

function chackTask(span, id) {
    span.classList.toggle("chack");
    tasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                completed: span.classList.contains("chack"),
            };
        }
        return task;
    });
    saveTasks();
}

function saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}























// if (window.localStorage.getItem("tasks")) {
//     tasks = JSON.parse(window.localStorage.getItem("tasks"));
//     console.log(tasks);
//     renderTasks();
// }

// submitTask.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (inputTask.value) {
//         const task = {
//             id: Date.now(),
//             title: inputTask.value,
//             completed: false
//         }
//         tasks.push(task);
//         inputTask.value = "";
//         renderTasks();
//         saveTasks();
//     } else {
//         alert("Please enter a task");
//     }
// });


// function saveTasks() {
//     window.localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function renderTasks() {
//     tasksContainer.innerHTML = "";
//     tasks.forEach((task) => {
//         const li = document.createElement("li");
//         li.className = task.title;
//         li.innerHTML = `
//         <span>${task.title}</span>
//         <button class="delete" onclick="deleteTask(${task.id})">X</button>`;
//         tasksContainer.appendChild(li);
//     });
// }

// function deleteTask(id) {
//     tasks = tasks.filter((task) => task.id !== id);
//     saveTasks();
//     renderTasks();
// }

