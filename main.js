// Query Dom
const todoForm = document.querySelector("#todo-form");
const taskName = document.querySelector("#todo-input");
const taskList = document.querySelector("#task-list");

// Tasks
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// escapeHTML

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// init renderTasks
function renderTasks() {
  if (!tasks.length) {
    taskList.innerHTML = `<li class="task-item">
        <span class="task-title">Task Empty</span>
      </li>`;
    return;
  }

  const tasksHtml = tasks
    .map((task) => {
      return `<li class="task-item">
        <span class="task-title">${task.name}</span>
        <div class="task-action">
          <button class="task-btn edit">Edit</button>
          <button class="task-btn done">Mark as done</button>
          <button class="task-btn delete">Delete</button>
        </div>
      </li>`;
    })
    .join("");
  taskList.innerHTML = tasksHtml;
}

// Form
todoForm.onsubmit = (e) => {
  e.preventDefault();

  const newTask = {
    id: tasks.length + 1,
    name: taskName.value.trim(),
    isComplete: false,
  };

  if (!newTask.name) {
    alert("Task name cannot be empty!");
    return;
  }
  // check task has exits
  const isExits = tasks.find(
    (task) => task.name.toLowerCase() === newTask.name.toLowerCase()
  );

  if (isExits) {
    alert("Task name already exits!");
    return;
  }
  // Add task to tasks
  newTask.name = escapeHTML(newTask.name);
  tasks.unshift(newTask);

  // save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // render Tasks
  renderTasks();

  // reset input
  taskName.value = "";
};

// call  renderTasks
renderTasks();
