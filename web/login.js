// Backend API URL
const API_URL = "http://localhost:3000/auth/login";

// Handle form submission
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        // Send POST request to backend
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // Save JWT token to localStorage
            localStorage.setItem("token", data.access_token);

            // Redirect to dashboard or appointments page
            window.location.href = "index.html";
        } else {
            // Handle login failure
            const errorData = await response.json();
            document.getElementById("message").textContent = errorData.message || "Invalid credentials!";
        }
    } catch (error) {
        console.error("Error logging in:", error);
        document.getElementById("message").textContent = "An error occurred. Please try again.";
    }
});
