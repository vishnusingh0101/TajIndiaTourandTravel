function openBookingModal(location, days) {
    const container = document.getElementById("bookingFormContent");
    container.innerHTML = `
        <div class="container py-4 wow" id="bookingForm">
            <div class="container">
                <div class="booking p-5">
                    <div class="row g-5 align-items-center">
                        <div class="col-md-6 text-white">
                            <h6 class="text-white mb-4">Inquiry</h6>
                            <h1 class="text-white mb-4">Our team will contact you for customizations within 24 hours.</h1>
                            <h4 class="text-white text-uppercase">Or WhatsApp - 
                                <a href="https://wa.me/917827000754?text=Hi%21" target="_blank">+91 7827000754</a>
                            </h4>
                        </div>
                        <div class="col-md-6">
                            <h1 class="text-white mb-4">Book A Tour</h1>
                            <form id="contactForm" onsubmit="sendEmail(); return false;" novalidate>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control bg-transparent" id="name" placeholder="Your Name" required>
                                            <label for="name">Your Name</label>
                                            <div class="invalid-feedback">Please enter a valid name (at least 3 characters).</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="email" class="form-control bg-transparent" id="email" placeholder="example@gmail.com" required>
                                            <label for="email">Email</label>
                                            <div class="invalid-feedback">Please enter a valid email address.</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="tel" class="form-control bg-transparent" id="phone" placeholder="Phone" required>
                                            <label for="phone">Phone</label>
                                            <div class="invalid-feedback">Please enter a valid phone number (10-15 digits).</div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="date" class="form-control bg-transparent" id="datetime" placeholder="Date" required>
                                            <label for="datetime">Date</label>
                                            <div class="invalid-feedback">Please select a valid date.</div>
                                        </div>
                                    </div>
                                    <input type="hidden" id="location" value="${location}">
                                    <input type="hidden" id="forDays" value="${days}">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="number" class="form-control bg-transparent" id="number_of_people" placeholder="No of Persons" required min="1">
                                            <label for="number_of_people">No of Persons</label>
                                            <div class="invalid-feedback">Please enter a valid number of people.</div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control bg-transparent" placeholder="Special Request" id="message" style="height: 100px" maxlength="500"></textarea>
                                            <label for="message">Message</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-outline-light w-100 py-3" type="submit">Get Quote</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    $("#bookingModal").modal("show");
}

function closeBookingModal() {
    $("#bookingModal").modal("hide");
}

function sendEmail() {
    // Collect field values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const datetime = document.getElementById("datetime").value;
    const location = document.getElementById("location").value;
    const forDays = document.getElementById("forDays").value;
    const number_of_people = document.getElementById("number_of_people").value;
    const message = document.getElementById("message").value.trim();

    // Clear previous validation
    resetValidation();

    // Validation
    if (!name || name.length < 3) {
        showValidationError("name", "Please enter a valid name (at least 3 characters).");
        return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showValidationError("email", "Please enter a valid email address.");
        return;
    }
    if (!phone || phone.length < 10 || phone.length > 15 || !/^\d+$/.test(phone)) {
        showValidationError("phone", "Please enter a valid phone number (10-15 digits).");
        return;
    }
    if (!datetime) {
        showValidationError("datetime", "Please select a valid date.");
        return;
    }
    if (!number_of_people || Number(number_of_people) <= 0) {
        showValidationError("number_of_people", "Please enter a valid number of people.");
        return;
    }

    // Initialize EmailJS
    emailjs.init("1el1PtFh_N1ch5v0A");

    // Create email payload
    const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        days: forDays || "Not specified",
        location: location || "Not specified",
        number_of_people,
        to_name: "Taj India Tour & Travel",
        subject: `Booking Inquiry: ${forDays} days at ${location}`,
        message: `${message || "No additional message."} On this date: ${datetime}. Number of people: ${number_of_people}`
    };

    // Send via EmailJS
    emailjs.send("service_w5uk33d", "template_lr13lz8", templateParams)
        .then(() => {
            successModal();
        })
        .catch(error => {
            console.error("Email sending failed:", error);
            alert("Failed to send email. Please try again later.");
        });
}

// Show validation error
function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add("is-invalid");
        const feedback = field.parentElement.querySelector(".invalid-feedback");
        if (feedback) feedback.textContent = message;
    }
}

// Reset validation states
function resetValidation() {
    const fields = document.querySelectorAll(".form-control");
    fields.forEach(field => {
        field.classList.remove("is-invalid");
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