function openBookingModal(e, a) {
    var o = document.getElementById("bookingFormContent");
    o.innerHTML = `
        <div class="container py-4 wow" id="bookingForm">
            <div class="container">
                <div class="booking p-5">
                    <div class="row g-5 align-items-center">
                        <div class="col-md-6 text-white">
                            <h1 class="text-white mb-4">Online Inquiry</h1>
                            <h4 class="text-white text-uppercase">Or Whatsapp - <a href="https://wa.me/917827000754?text=Hi%21" target="_blank">+91 7827000754</a></h4>
                        </div>
                        <div class="col-md-6">
                            <h1 class="text-white mb-4">Get A Quote</h1>
                            <form id="contactForm" onsubmit="sendEmail(); return false">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control bg-transparent" id="name" placeholder="Your Name" required minlength="3">
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="email" class="form-control bg-transparent" id="email" placeholder="tajindiatourandtravel@gmail.com" required>
                                            <label for="email">Email</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="tel" class="form-control bg-transparent" id="phone" placeholder="+91**********" required minlength="10" maxlength="15">
                                            <label for="phone">Phone</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="date" class="form-control bg-transparent" id="datetime" placeholder="Date" required>
                                            <label for="datetime">Date</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input value="${e}" class="form-control bg-transparent" id="location" placeholder="Location" hidden>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input value="${a}" class="form-control bg-transparent" id="forDays" placeholder="No of Days" hidden>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control bg-transparent" id="number_of_people" placeholder="No of Persons" required min="1">
                                            <label for="number_of_people">No of Persons</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <textarea class="form-control bg-transparent" placeholder="Special Request" id="message" style="height: 58px" maxlength="500"></textarea>
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
    var numberOfPeople = document.getElementById("number_of_people").value;
    var message = document.getElementById("message").value.trim();

    // Validate form fields
    if (!name || name.length < 3) {
        alert("Please enter a valid name (at least 3 characters).");
        return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!phone || phone.length < 10 || phone.length > 15) {
        alert("Please enter a valid phone number (10-15 digits).");
        return;
    }
    if (!datetime) {
        alert("Please select a valid date.");
        return;
    }
    if (!numberOfPeople || numberOfPeople < 1) {
        alert("Please enter the number of persons (minimum 1).");
        return;
    }

    // Initialize EmailJS
    emailjs.init("dpHylrOzMjDWa9VYF");

    // Prepare the email parameters
    var templateParams = {
        to_name: "Taj India Tour & Travel",
        from_name: name,
        from_email: email,
        from_phone: phone,
        day: forDays,
        location: location,
        subject: `Booking for ${forDays} days at ${location}`,
        message: `${message}. On this date: ${datetime}. Number of people: ${numberOfPeople}`
    };

    // Send email using EmailJS
    emailjs.send("service_w5uk33d", "template_lr13lz8", templateParams)
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            successModal();
        })
        .catch(function (error) {
            console.error("FAILED...", error);
            alert("Failed to send email. Please try again later.");
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
