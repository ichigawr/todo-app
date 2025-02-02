const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const alertText = document.getElementById("alert-text");
const todoList = document.getElementById("todo-list");

localStorage.todos ??= JSON.stringify([]);

const renderTodos = () => {
  const todos = JSON.parse(localStorage.todos);
  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li>
          <label>
            <input type="checkbox" />
            <span>${todo}</span>
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
  const todo = input.value;

  if (todo.length === 0) {
    alertText.style.color = "red";

    setTimeout(() => {
      alertText.style.color = "transparent";
    }, 2000);

    return;
  }

  const todos = JSON.parse(localStorage.todos);
  todos.push(todo);
  localStorage.todos = JSON.stringify(todos);
  renderTodos();
  input.value = "";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

todoList.addEventListener("click", (e) => {
  if (e.target.closest(".delete-todo")) {
    const todoText = e.target.closest("li").querySelector("span").textContent;
    const todos = JSON.parse(localStorage.todos);
    const newTodos = todos.filter((todo) => todo !== todoText);
    localStorage.todos = JSON.stringify(newTodos);
    renderTodos();
  }
});

renderTodos();
