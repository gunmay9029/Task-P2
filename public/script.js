const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const statusMessage = document.getElementById("statusMessage");

subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
        statusMessage.textContent = "Invalid email entered.";
        return;
    }

    statusMessage.textContent = "Sending...";

    try {
        const response = await fetch("/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        const result = await response.json();

        if (response.ok) {
            statusMessage.textContent = result.message;
            subscribeForm.reset();
        } else {
            statusMessage.textContent =
                result.message || "Unable to subscribe. Please try again.";
        }
    } catch (error) {
        console.error("Subscription error:", error);
        statusMessage.textContent =
            "Something went wrong. Please try again later.";
    }
});