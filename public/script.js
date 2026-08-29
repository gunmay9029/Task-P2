// Wait until the webpage has completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // Listen for any form submission on the page
    document.addEventListener("submit", async function (event) {

        // Only handle the Daily Insider form
        if (event.target.id !== "signupForm") {
            return;
        }

        // Stop the page from jumping to the top
        event.preventDefault();

        const form = event.target;
        const emailInput = document.getElementById("email");
        const message = document.getElementById("message");

        const email = emailInput.value.trim();

        // Validate empty email
        if (email === "") {
            message.textContent = "Please enter your email address.";
            return;
        }

        // Validate basic email format
        if (!email.includes("@") || !email.includes(".")) {
            message.textContent = "Please enter a valid email address.";
            return;
        }

        // Show sending message
        message.textContent = "Sending...";

        try {

            // Send the email to the Express server
            const response = await fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();

            message.textContent = data.message;

            if (response.ok) {
                form.reset();
            }

        } catch (error) {

            console.error("Subscription error:", error);

            message.textContent =
                "Something went wrong. Please try again later.";
        }
    });
});