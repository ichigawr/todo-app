const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const alertText = document.getElementById("alert-text");
const todoList = document.getElementById("todo-list");

localStorage.todos ??= JSON.stringify([]);

const renderTodos = () => {
  const todos = JSON.parse(localStorage.todos);

  if (todos.length === 0) {
    todoList.innerHTML = `
      <li>
        <span style="margin-left: 1.25rem">No todos yet!</span>
      </li>
    `;

    return;
  }

  todoList.innerHTML = todos
    .map(
      ({ name, completed }) => `
        <li>
          <label>
            <input type="checkbox" ${completed ? "checked" : ""} />
            <span>${name}</span>
          </label>
          <button class="delete-todo">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
    `
    )
    .join("");
};

addBtn.addEventListener("click", () => {
  const todo = input.value.trim();

  if (todo.length === 0) {
    alertText.style.color = "red";

    setTimeout(() => {
      alertText.style.color = "transparent";
    }, 2000);

    return;
  }

  const todos = JSON.parse(localStorage.todos);
  todos.push({ name: todo, completed: false });
  localStorage.todos = JSON.stringify(todos);
  renderTodos();
  input.value = "";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

todoList.addEventListener("click", (e) => {
  // Delete todo
  if (e.target.closest(".delete-todo")) {
    const todoText = e.target.closest("li").querySelector("span").textContent;
    const todos = JSON.parse(localStorage.todos);
    const newTodos = todos.filter((todo) => todo.name !== todoText);
    localStorage.todos = JSON.stringify(newTodos);
    renderTodos();
    return;
  }

  // Toggle todo completion
  if (e.target.tagName === "INPUT") {
    const todoText = e.target.closest("li").querySelector("span").textContent;
    const todos = JSON.parse(localStorage.todos);
    const newTodos = todos.map((todo) =>
      todo.name === todoText ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.todos = JSON.stringify(newTodos);
  }
});

renderTodos();
