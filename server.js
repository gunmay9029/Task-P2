require("dotenv").config();

const express = require("express");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = 3000;

// Configure SendGrid using the API key stored in .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Newsletter subscription endpoint
app.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    // Validate the email field
    if (!email || !email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email address entered."
        });
    }

    const emailMessage = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: "Welcome to DEV@Deakin!",
        text: `Hi Gunmay,

Welcome to DEV@Deakin!

Thank you for subscribing to the DEV@Deakin newsletter.

Regards,
DEV@Deakin`
    };

    try {
        await sgMail.send(emailMessage);

        console.log("Email sent successfully. Status: 202");

        res.status(202).json({
            message: "Subscription successful! Welcome email sent."
        });

    } catch (error) {
        console.error(
            "Email sending failed:",
            error.response?.body || error.message
        );

        res.status(500).json({
            message: "Unable to send the welcome email. Please try again later."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});