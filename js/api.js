const API_URL = `http://localhost:3001/todos`;
const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");
export const userId = loginData?.user?.id;

export const getTodos = async () => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  return fetch(`${API_URL}?userId=${userId}`, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
};

export const addTodo = async (todos) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(todos),
  };

  return fetch(API_URL, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const patchTodo = async (id, updates) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(updates),
  };

  return fetch(`${API_URL}/${id}`, options)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const deleteTodo = async (id) => {
  const options = {
    method: "DELETE",
  };

  return fetch(`${API_URL}/${id}`, options)
    .then((response) => response.ok)
    .catch((error) => console.error(error));
};
