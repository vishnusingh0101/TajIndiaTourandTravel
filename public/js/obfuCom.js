function sendEmail() {
    // Get field values
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    // Validation regex patterns
    var phoneRegex = /^\d{10}$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        alert("Please enter a valid name without numbers or special characters.");
        return;
    }

    // Validate Email
    if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate Phone
    if (!phone || !phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Validate Subject
    if (!subject || subject.length < 3) {
        alert("Please enter a subject with at least 3 characters.");
        return;
    }

    // Validate Message
    // if (!message || message.length < 10) {
    //     alert("Please enter a message with at least 10 characters.");
    //     return;
    // }

    // Initialize EmailJS
    emailjs.init("dpHylrOzMjDWa9VYF");

    // Data for the email template
    var emailData = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        subject: subject,
        days: "", // Assuming this is a placeholder
        to_name: "Taj India Tour & Travel",
        message: message
    };

    // Send email using EmailJS
    emailjs.send("service_8j9vn8o", "template_lr13lz8", emailData)
        .then(function (response) {
            successModal();
            blankfields();
        }, function (error) {
            alert("Email failed to send: " + JSON.stringify(error));
            blankfields();
        });
}

// Clear input fields after submission
function blankfields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
}

// Show success modal
function successModal() {
    $("#successModal").modal("show");
    $("#bookingModal").modal("hide");
    setTimeout(function () {
        $("#successModal").modal("hide");
    }, 5000);
}

// Close modal function
function closeModal() {
    $("#successModal").modal("hide");
}
