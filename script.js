const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo");
const alertText = document.getElementById("alert-text");
const filter = document.getElementById("filter-todos");
const filterBtns = Array.from(filter.getElementsByTagName("input"));
const todoList = document.getElementById("todo-list");

localStorage.todos ??= JSON.stringify([]);

const renderTodos = (todos) => {
  try {
    todos = todos ?? JSON.parse(localStorage.todos);
  } catch (error) {
    console.error(error);
  }

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
            <input
              type="checkbox"
              class="checkbox"
              ${completed ? "checked" : ""}
            />
            <span>${name}</span>
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

addBtn.addEventListener("click", () => {
  const todo = input.value.trim();

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

  try {
    const todos = JSON.parse(localStorage.todos);

    if (todos.some((t) => t.name === todo)) {
      alert("Todo already exists.");
      return;
    }

    todos.push({ name: todo, completed: false });
    localStorage.todos = JSON.stringify(todos);
    renderTodos();
    input.value = "";
  } catch (error) {
    console.error(error);
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

filter.addEventListener("click", (e) => {
  try {
    const todos = JSON.parse(localStorage.todos);

    if (e.target.closest("#all-todos")) {
      renderTodos();
      return;
    }

    if (e.target.closest("#active-todos")) {
      const active = todos.filter((todo) => !todo.completed);
      renderTodos(active);
      return;
    }

    if (e.target.closest("#completed-todos")) {
      const completed = todos.filter((todo) => todo.completed);
      renderTodos(completed);
    }
  } catch (error) {
    console.error(error);
  }
});

const editTodo = (e) => {
  const li = e.target.closest("li");
  const span = li.querySelector("span");
  const todoText = span.textContent;
  const input = document.createElement("input");
  input.value = todoText;
  span.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    const newText = input.value.trim();

    if (!newText) {
      input.replaceWith(span);
      return;
    }

    try {
      const todos = JSON.parse(localStorage.todos);
      const editedTodo = todos.find((todo) => todo.name === todoText);
      editedTodo.name = newText;
      localStorage.todos = JSON.stringify(todos);
    } catch (error) {
      console.error(error);
    }

    input.outerHTML = `<span>${newText}</span>`;
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") input.blur();
  });
};

const deleteTodo = (e) => {
  const todoText = e.target.closest("li").querySelector("span").textContent;

  try {
    const todos = JSON.parse(localStorage.todos);
    const newTodos = todos.filter((todo) => todo.name !== todoText);
    localStorage.todos = JSON.stringify(newTodos);
  } catch (error) {
    console.error(error);
  }

  renderTodos();
};

const toggleCompleted = (e) => {
  const li = e.target.closest("li");
  const todoText = li.querySelector("span").textContent;

  try {
    const todos = JSON.parse(localStorage.todos);
    const toggledTodo = todos.find((todo) => todo.name === todoText);
    toggledTodo.completed = !toggledTodo.completed;
    localStorage.todos = JSON.stringify(todos);
  } catch (error) {
    console.error(error);
  }

  setTimeout(() => {
    filterBtns.find((input) => input.checked).click();
  }, 200);

  const editBtn = li.getElementsByClassName("edit-todo")[0];
  editBtn.disabled = !editBtn.disabled;
};

todoList.addEventListener("click", (e) => {
  if (e.target.closest(".edit-todo")) {
    editTodo(e);
    return;
  }

  if (e.target.closest(".delete-todo")) {
    deleteTodo(e);
    return;
  }

  if (e.target.tagName === "INPUT") {
    toggleCompleted(e);
  }
});

renderTodos();
