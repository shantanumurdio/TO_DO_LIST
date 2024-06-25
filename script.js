document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const completedList = document.getElementById("completed-list");

  addBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      checkbox.checked ? moveToCompleted(li) : moveToTodoFromCompleted(li);
    });

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", editTask);

    todoList.appendChild(li);
    taskInput.value = "";
  }

  function moveToCompleted(taskItem) {
    const taskText = taskItem.querySelector("span").innerText;

    const completedLi = document.createElement("li");
    completedLi.innerHTML = `
            <input type="checkbox" checked>
            <span>${taskText}</span>
            <div>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    const deleteBtn = completedLi.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    const checkbox = completedLi.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      if (!checkbox.checked) moveToTodoFromCompleted(completedLi);
    });

    completedList.appendChild(completedLi);
    taskItem.remove();
  }

  function moveToTodoFromCompleted(taskItem) {
    const taskText = taskItem.querySelector("span").innerText;

    const todoLi = document.createElement("li");
    todoLi.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    const checkbox = todoLi.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      checkbox.checked
        ? moveToCompleted(todoLi)
        : moveToTodoFromCompleted(todoLi);
    });

    const deleteBtn = todoLi.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    const editBtn = todoLi.querySelector(".edit-btn");
    editBtn.addEventListener("click", editTask);

    todoList.appendChild(todoLi);
    taskItem.remove();
  }

  function deleteTask() {
    const listItem = this.closest("li");
    listItem.remove();
  }

  function editTask() {
    const listItem = this.closest("li");
    const span = listItem.querySelector("span");
    const currentText = span.innerText;
    const newText = prompt("Edit task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      span.innerText = newText;
    }
  }
});
