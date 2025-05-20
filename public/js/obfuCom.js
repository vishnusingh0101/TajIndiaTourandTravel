function sendEmail() {
    // Fetch and trim input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Regex patterns for validation
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    // Validation checks
    if (!name || !nameRegex.test(name)) {
        alert("Please enter a valid name (letters and spaces only).");
        return;
    }

    if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phone || !phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (!subject || subject.length < 3) {
        alert("Please enter a subject (at least 3 characters).");
        return;
    }

    // Optional: Message validation
    // if (!message || message.length < 10) {
    //     alert("Please enter a message with at least 10 characters.");
    //     return;
    // }

    // Initialize EmailJS (ensure it runs only once in a real app)
    emailjs.init("1el1PtFh_N1ch5v0A");

    // Prepare email data
    const emailData = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        subject: subject,
        to_name: "Taj India Tour & Travel",
        message: message || "No message provided."
    };

    // Send email
    emailjs.send("service_w5uk33d", "template_lr13lz8", emailData)
        .then(response => {
            console.log("Email sent successfully", response.status, response.text);
            successModal();
            clearFormFields();
        })
        .catch(error => {
            console.error("Email sending failed", error);
            alert("Failed to send email. Please try again later.");
        });
}

// Clear form fields after successful submission
function clearFormFields() {
    ["name", "email", "phone", "subject", "message"].forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = "";
    });
}

// Show success modal
function successModal() {
    $("#successModal").modal("show");
    $("#bookingModal").modal("hide");
    setTimeout(() => {
        $("#successModal").modal("hide");
    }, 5000);
}

// Close modal manually
function closeModal() {
    $("#successModal").modal("hide");
}
