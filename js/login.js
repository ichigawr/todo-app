const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const userInfo = Object.fromEntries(formData);
  userInfo.email = userInfo.email.trim();

  if (userInfo.email === "") {
    alert("Email is required.");
    return;
  }

  if (userInfo.password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(userInfo),
  };

  fetch("http://localhost:3001/login", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) {
        localStorage.setItem("loginData", JSON.stringify(data));
        location.href = "../index.html";
      } else {
        alert(data.error || "Unexpected error occurred.");
        loginForm.reset();
      }
    })
    .catch((error) => console.error(error));
});
