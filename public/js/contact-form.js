document.addEventListener("DOMContentLoaded", function () {
    // Check if the form has been shown in this session
    if (!sessionStorage.getItem('contactFormShown')) {
        setTimeout(function () {
            // Modal form HTML
            var modalHTML = `
            <div id="contactFormModal" class="card shadow" 
                style="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); z-index: 9999; 
                display: block; border-radius: 8px; overflow: hidden; width: 350px;">
                <div class="card-body p-4" style="background-color: #e6f7e6; position: relative; border: 1px solid #c3e6cb;">
                    <span class="close-btn" onclick="closeFormnow()" 
                        style="position: absolute; top: 10px; right: 10px; font-size: 24px; cursor: pointer; color: #155724;">&times;</span>
                    <h3 class="text-center mb-3" style="color: #28a745; font-weight: bold; font-size: 1.5em;">Enquire Now</h3>
                    <form id="contactForm" onsubmit="return validateForm(event)">
                        <div class="mb-3">
                            <input type="text" class="form-control rounded-3 p-2" id="name" name="name" 
                                placeholder="Your Name" required>
                            <div id="nameError" class="text-danger small mt-1" style="display:none;">Name is required.</div>
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control rounded-3 p-2" id="email" name="email" 
                                placeholder="Email" required>
                            <div id="emailError" class="text-danger small mt-1" style="display:none;">Please enter a valid email.</div>
                        </div>
                        <div class="mb-3 d-flex">
                            <select class="form-select rounded-3 me-2" id="countryCode" style="width: 40%;">
                                <option value="+91" selected>IN +91</option>
                                <option value="+1">US +1</option>
                                <option value="+44">UK +44</option>
                                <option value="+61">AU +61</option>
                            </select>
                            <input type="tel" class="form-control rounded-3 p-2" id="phone" name="phone" 
                                placeholder="Number" required>
                            <div id="phoneError" class="text-danger small mt-1" style="display:none;">Phone number is required.</div>
                        </div>
                        <div class="mb-3">
                            <input type="date" class="form-control rounded-3 p-2" id="travelDate" name="travelDate" required>
                            <div id="travelDateError" class="text-danger small mt-1" style="display:none;">Please select a travel date.</div>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control rounded-3" id="message" name="message" rows="3" 
                                placeholder="Message" required 
                                style="resize: none; overflow-y: auto; line-height: 1.2; padding: 5px;"></textarea>
                            <div id="messageError" class="text-danger small mt-1" style="display:none;">Message is required.</div>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn text-white fw-bold" 
                                style="background-color: #28a745; border-radius: 30px; padding: 8px 30px; 
                                box-shadow: 0 4px 8px rgba(0,0,0,0.2);">Submit</button>
                        </div>
                    </form>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }, 2000);
    }

    // Close Form Function
    window.closeFormnow = function () {
        var modal = document.getElementById('contactFormModal');
        if (modal) {
            modal.remove();
            sessionStorage.setItem('contactFormShown', 'true');
        }
    };

    // EmailJS initialization
    emailjs.init("1el1PtFh_N1ch5v0A");

    // Validate Form Function
    window.validateForm = function (event) {
        event.preventDefault();
        clearErrors();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const travelDate = document.getElementById("travelDate").value.trim();
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        if (name === "") { showError("nameError"); isValid = false; }
        if (!validateEmail(email)) { showError("emailError"); isValid = false; }
        if (phone === "") { showError("phoneError"); isValid = false; }
        if (travelDate === "") { showError("travelDateError"); isValid = false; }
        if (message === "") { showError("messageError"); isValid = false; }

        if (isValid) {
            const fullMessage = `${message}\n\nTravel Date: ${travelDate}`;

            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone,
                subject: `Booking Enquiry for ${travelDate}`,
                message: fullMessage,
                to_name: "Taj India Tour & Travel"
            };

            emailjs.send("service_w5uk33d", "template_lr13lz8", templateParams)
                .then(function (response) {
                    alert("Form submitted and email sent successfully!");
                    closeFormnow();
                })
                .catch(function (error) {
                    console.error("Email failed to send:", error);
                    alert("Failed to send email. Please try again later.");
                });
        }
    };

    function showError(errorId) {
        document.getElementById(errorId).style.display = "block";
    }

    function clearErrors() {
        document.querySelectorAll(".text-danger").forEach(function (element) {
            element.style.display = "none";
        });
    }

    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});