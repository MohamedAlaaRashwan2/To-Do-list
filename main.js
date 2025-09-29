
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
        if (editId !== 0) {
            // تعديل المهمة
            tasks = tasks.map((task) => {
                if (task.id === editId) {
                    return { ...task, 
                        title: inputTask.value 
                    };
                }
                return task;
            });
            editId = 0;
        } else {
            // إضافة مهمة جديدة
            const task = {
                id: Date.now(),
                title: inputTask.value,
                completed: false,
                createdAt: Date.now(),
                notified: false
            };
            tasks.push(task);
        }
        inputTask.value = "";
        renderTasks();
        saveTasks();
    } else {
        alert("Please enter a task");
    }
});



setInterval(() => {
    const tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    const now = Date.now();

    let update = false;
    tasks.map((task) => {
        const diff = now - task.createdAt;
        if (diff >= 24 * 60 * 60 * 1000 && !task.notified) {
            alert(`Task "${task.title}" is due!`);
            update = true;
            return { ...task, notified: true };
        }
        return task;
    });

    if (update) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}, 1000);

function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        if (task.title !== "") {
            li.className = task.title;
            li.innerHTML = `
        <span onclick="chackTask(this, ${task.id})" class="${task.completed ? 'chack' : ''}">${task.title}</span>
        <div>
        <button class="edit" onclick="editTask(${task.id})"><i class="fa-solid fa-pen"></i></button>
        <button class="delete" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        tasksContainer.prepend(li);}
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
                ...task,
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

let editId = 0;

function editTask(id) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        inputTask.value = task.title;
        editId = id;
        inputTask.focus();
    }
}


