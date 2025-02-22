import { renderTodos } from "./ui.js";
import { getTodos, patchTodo, deleteTodo } from "./api.js";

export const editTodo = async (e) => {
  const li = e.target.closest("li");
  const span = li.querySelector("span");
  const todoText = span.textContent;
  const input = document.createElement("input");
  input.value = todoText;
  span.replaceWith(input);
  input.focus();

  input.addEventListener("blur", async () => {
    const newText = input.value.trim();

    if (!newText) {
      input.replaceWith(span);
      return;
    }

    const todos = await getTodos();
    const editedTodo = todos.find((todo) => todo.title === todoText);
    editedTodo.title = newText;
    await patchTodo(editedTodo.id, editedTodo);

    input.outerHTML = `<span>${newText}</span>`;
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") input.blur();
  });
};

export const removeTodo = async (e) => {
  const todoText = e.target.closest("li").querySelector("span").textContent;

  const todos = await getTodos();
  const todo = todos.find((todo) => todo.title === todoText);
  const deleted = await deleteTodo(todo.id);

  if (deleted) await renderTodos();
};

export const toggleCompleted = async (e, filterBtns) => {
  const li = e.target.closest("li");
  const todoText = li.querySelector("span").textContent;

  const todos = await getTodos();
  const toggledTodo = todos.find((todo) => todo.title === todoText);
  toggledTodo.completed = !toggledTodo.completed;
  await patchTodo(toggledTodo.id, toggledTodo);

  const editBtn = li.getElementsByClassName("edit-todo")[0];
  editBtn.disabled = !editBtn.disabled;
};
