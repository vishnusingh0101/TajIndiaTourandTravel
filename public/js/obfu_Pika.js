function openBookingModal(e, a) {
    var o = document.getElementById("bookingFormContent");
    o.innerHTML = `
    <div class="container py-4 wow" id="bookingForm">
        <div class="container">
            <div class="booking p-5">
                <div class="row g-5 align-items-center">
                    <div class="col-md-6 text-white">
                        <h6 class="text-white mb-4">Inquiry</h6>
                        <h1 class="text-white mb-4">Our team will contact you for customizations within 24hours.</h1>
                        <h4 class="text-white text-uppercase">Or Whatsapp - <a href="https://wa.me/917827000754?text=Hi%21" target="_blank">+91 7827000754</a></h4>
                    </div>
                    <div class="col-md-6">
                        <h1 class="text-white mb-4">Book A Tour</h1>
                        <form id="contactForm" onsubmit="sendEmail(); return false" novalidate>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control bg-transparent" id="name" placeholder="Your Name" required minlength="3">
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
                                        <input type="tel" class="form-control bg-transparent" id="phone" placeholder="Phone" required minlength="10" maxlength="15">
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
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input value="${e}" class="form-control bg-transparent" id="location" placeholder="Location" hidden>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input value="${a}" class="form-control bg-transparent" id="forDays" placeholder="Number of Days" hidden>
                                    </div>
                                </div>
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
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var datetime = document.getElementById("datetime").value;
    var location = document.getElementById("location").value;
    var forDays = document.getElementById("forDays").value;
    var number_of_people = document.getElementById("number_of_people").value;
    var message = document.getElementById("message").value.trim();

    // Reset validation messages
    resetValidation();

    // Client-side validation
    if (!name || name.length < 3) {
        showValidationError("name", "Please enter a valid name (at least 3 characters).");
        return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showValidationError("email", "Please enter a valid email address.");
        return;
    }
    if (!phone || phone.length < 10 || phone.length > 15) {
        showValidationError("phone", "Please enter a valid phone number (10-15 digits).");
        return;
    }
    if (!datetime) {
        showValidationError("datetime", "Please select a valid date.");
        return;
    }
    if (!number_of_people || number_of_people <= 0) {
        showValidationError("number_of_people", "Please enter a valid number of people.");
        return;
    }

    // Initialize EmailJS
    // emailjs.init("dpHylrOzMjDWa9VYF");
    emailjs.init("1el1PtFh_N1ch5v0A");

    // Prepare EmailJS template parameters
    var templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        days: forDays,
        location: location,
        number_of_people: number_of_people,
        to_name: "Taj India Tour & Travel",
        subject: `Booking for ${forDays} days at ${location}`,
        message: `${message}. On this date: ${datetime}. Number of people: ${number_of_people}`
    };

    // Send email using EmailJS
    emailjs.send("service_w5uk33d", "template_lr13lz8", templateParams)
        .then(function (response) {
            successModal();
        })
        .catch(function (error) {
            console.error("Email failed to send:", error);
            alert("Failed to send email. Please try again later.");
        });
}

function showValidationError(fieldId, message) {
    var field = document.getElementById(fieldId);
    field.classList.add("is-invalid");
    var feedback = field.nextElementSibling;
    feedback.textContent = message;
}

function resetValidation() {
    var fields = document.querySelectorAll(".form-control");
    fields.forEach(function (field) {
        field.classList.remove("is-invalid");
    });
}

function successModal() {
    $("#successModal").modal("show");
    $("#bookingModal").modal("hide");
    setTimeout(function () {
        $("#successModal").modal("hide");
    }, 5000);
}

function closeModal() {
    $("#successModal").modal("hide");
}
