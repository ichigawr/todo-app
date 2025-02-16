import { renderTodos, todoList } from "./js/ui.js";
import { getTodos, addTodo } from "./js/api.js";
import { editTodo, removeTodo, toggleCompleted } from "./js/handlers.js";

const mainInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const alertText = document.getElementById("alert-text");
const filter = document.getElementById("filter-todos");
const filterBtns = Array.from(filter.getElementsByTagName("input"));

addBtn.addEventListener("click", async () => {
  const todo = mainInput.value.trim();

  const alert = (message) => {
    alertText.textContent = message;
    alertText.style.color = "red";

    setTimeout(() => {
      alertText.style.color = "transparent";
    }, 2000);
  };

  if (todo.length === 0) {
    alert("Please enter a todo.");
    return;
  }

  const todos = await getTodos();

  if (todos.some((t) => t.title === todo)) {
    alert("Todo already exists.");
    return;
  }

  await addTodo({ title: todo, completed: false });
  await renderTodos();
  mainInput.value = "";
});

mainInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

filter.addEventListener("click", async (e) => {
  const todos = await getTodos();

  if (e.target.closest("#all-todos")) {
    await renderTodos();
    return;
  }

  if (e.target.closest("#active-todos")) {
    const active = todos.filter((todo) => !todo.completed);
    await renderTodos(active);
    return;
  }

  if (e.target.closest("#completed-todos")) {
    const completed = todos.filter((todo) => todo.completed);
    await renderTodos(completed);
  }
});

todoList.addEventListener("click", async (e) => {
  if (e.target.closest(".edit-todo")) {
    await editTodo(e);
    return;
  }

  if (e.target.closest(".delete-todo")) {
    await removeTodo(e);
    return;
  }

  if (e.target.tagName === "INPUT") {
    await toggleCompleted(e, filterBtns);
  }
});

await renderTodos();
