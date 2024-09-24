document.addEventListener("DOMContentLoaded", function() {
    const inputTodo = document.getElementById("inputTodo");
    const todoList = document.getElementById("todoList");
    const btnDeleteAll = document.getElementById("btnDeleteAll");
    const todoForm = document.getElementById("todoForm");
    const unfinishedTask = document.getElementById("unfinishedTask");

    function updateTaskCount() {
        const allTasks = document.querySelectorAll("#todoList li");
        const unfinishedTasks = Array.from(allTasks).filter(task => !task.classList.contains("list-group-item-success"));
        unfinishedTask.textContent = `Unfinished Task: ${unfinishedTasks.length}`;
        if (unfinishedTasks.length === 0 && allTasks.length > 0) {
            setTimeout(() => {
                alert("Great! All your tasks are finished.");
            }, 50); 
        }
    }

    function addTask(taskText) {
        if (taskText === "") return;

        const newTask = document.createElement("li");
        newTask.classList.add("list-group-item");

        newTask.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <a href="#" class="text-decoration-none text-body task-link">
                    <p class="mb-0 taskText">${taskText}</p>
                </a>
                <div>
                    <button type="button" class="btn btn-outline-danger btnDeleteTask">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        newTask.querySelector(".task-link").addEventListener("click", function(event) {
            event.preventDefault();
            newTask.classList.toggle("list-group-item-success");
            const taskTextElement = newTask.querySelector(".taskText");
            taskTextElement.classList.toggle("text-decoration-line-through");
            updateTaskCount(); 
        });

        newTask.querySelector(".btnDeleteTask").addEventListener("click", function() {
            todoList.removeChild(newTask);
            updateTaskCount();
        });

        todoList.appendChild(newTask);
        updateTaskCount();

    }

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addTask(inputTodo.value);
        inputTodo.value = "";
    });

    btnDeleteAll.addEventListener("click", function() {
        todoList.innerHTML = "";
        updateTaskCount();
    });
});