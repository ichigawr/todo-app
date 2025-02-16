import { getTodos } from "./api.js";

export const todoList = document.getElementById("todo-list");

export const renderTodos = async (todos = null) => {
  todos ??= await getTodos();

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
      ({ title, completed }) => `
        <li>
          <label>
            <input
              type="checkbox"
              class="checkbox"
              ${completed ? "checked" : ""}
            />
            <span>${title}</span>
          </label>
          <div class="buttons">
            <button class="edit-todo" ${completed ? "disabled" : ""}>
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete-todo">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </li>
      `
    )
    .join("");
};
