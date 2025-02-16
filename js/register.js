const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const userInfo = Object.fromEntries(formData);
  console.log(userInfo);

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

  fetch("http://localhost:3001/register", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.accessToken) {
        console.log(data);
        if (confirm("Registration successful. Login now?")) {
          location.href = "login.html";
        }
      } else {
        alert(data.error || "Unexpected error occurred.");
        registerForm.reset();
      }
    })
    .catch((error) => console.error(error));
});
