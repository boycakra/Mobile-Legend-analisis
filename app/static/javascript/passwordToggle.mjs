export function initializePasswordToggle() {
    const passwordInput = document.getElementById("password-input");
    const passwordToggle = document.getElementById("password-toggle");

    passwordToggle.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            passwordToggle.textContent = "Show";
        }
    });
}
