document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const todoList = document.getElementById("todoList");
  const deleteAllBtn = document.getElementById("deleteAllBtn");

  let tasks = [];

  // Render table
  function renderTasks() {
    todoList.innerHTML = "";

    if (tasks.length === 0) {
      todoList.innerHTML = `
        <tr>
          <td colspan="4" class="empty">No task found</td>
        </tr>
      `;
      return;
    }

    tasks.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.text}</td>
        <td>${task.date}</td>
        <td>${task.done ? "✅ Done" : "⏳ Pending"}</td>
        <td>
          <button onclick="deleteTask(${index})">Delete</button>
        </td>
      `;
      todoList.appendChild(row);
    });
  }

  // Add task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const date = dateInput.value;

    if (text === "" || date === "") {
      alert("Please fill in both task and date!");
      return;
    }

    tasks.push({ text, date, done: false });
    taskInput.value = "";
    dateInput.value = "";
    renderTasks();
  });

  // Delete all
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
      tasks = [];
      renderTasks();
    }
  });

  // Expose delete function globally
  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  // Initial render
  renderTasks();
});
