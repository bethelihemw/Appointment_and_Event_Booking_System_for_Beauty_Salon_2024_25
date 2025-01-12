
// Interface for the expected response from the backend
interface LoginResponse {
    access_token: string;
}

// Handle form submission
document.getElementById("loginForm")?.addEventListener("submit", async (event: Event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form input values
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const username: string = usernameInput.value.trim();
    const password: string = passwordInput.value.trim();

    try {
        // Send POST request to backend
        const response: Response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data: LoginResponse = await response.json();

            // Save JWT token to localStorage
            localStorage.setItem("token", data.access_token);

            // Redirect to dashboard or appointments page
            window.location.href = "index.html";
        } else {
            // Handle login failure
            const errorData: { message?: string } = await response.json();
            const messageElement = document.getElementById("message");
            if (messageElement) {
                messageElement.textContent = errorData.message || "Invalid credentials!";
            }
        }
    } catch (error) {
        console.error("Error logging in:", error);
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = "An error occurred. Please try again.";
        }
    }
});
