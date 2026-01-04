function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "agenceimmobiliere2026@gmail.com" && pass === "immo2026") {
        localStorage.setItem("auth", "true");
        location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Login ou mot de passe incorrect";
    }
}

function checkAuth() {
    if (!localStorage.getItem("auth")) {
        location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("auth");
    location.href = "login.html";
}