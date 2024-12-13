const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");
const errorMessage = document.getElementById("error-message");

// Toggle to Sign-Up form
switchToSignup.addEventListener("click", () => {
  loginContainer.style.display = "none";
  signupContainer.style.display = "block";
});

// Toggle to Login form
switchToLogin.addEventListener("click", () => {
  signupContainer.style.display = "none";
  loginContainer.style.display = "block";
});

// Handle Login form submission
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      alert("Login successful!");
      // Redirect or store token (if necessary)
    } else {
      const errorText = await response.text();
      showError(errorText);
    }
  } catch (error) {
    console.error("Error:", error);
    showError("Error connecting to the server");
  }
});

// Handle Sign-Up form submission
document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      alert("Sign-Up successful!");
      signupContainer.style.display = "none";
      loginContainer.style.display = "block";
    } else {
      const errorText = await response.text();
      showError(errorText);
    }
  } catch (error) {
    console.error("Error:", error);
    showError("Error connecting to the server");
  }
});

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}
