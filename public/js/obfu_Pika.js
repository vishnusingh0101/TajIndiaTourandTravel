function openBookingModal(e,a){var o=document.getElementById("bookingFormContent");o.innerHTML=`
        <div class="container py-4 wow " id="bookingForm">
            <div class="container">
                <div class="booking p-5">
                    <div class="row g-5 align-items-center">
                        <div class="col-md-6 text-white">
                            <h6 class="text-white text-uppercase">Booking</h6>
                            <h1 class="text-white mb-4">Online Booking</h1>
                            <h4 class="text-white text-uppercase">Or Whatsapp - <a href="https://wa.me/918447095180?text=Hi%21" target="_blank">+91 8447095180</a></h4>
                        </div>
                        <div class="col-md-6">
                            <h1 class="text-white mb-4">Book A Tour</h1>
                            <form id="contactForm" onsubmit="sendEmail(); return false">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control bg-transparent" id="name" placeholder="Your Name">
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="email" class="form-control bg-transparent" id="email" placeholder="tajindiatourandtravel@gmail.com">
                                            <label for="email">example@gmail.com</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="phone" class="form-control bg-transparent" id="phone" placeholder="phone">
                                            <label for="phone">phone</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating date" id="date3" data-target-input="nearest">
                                            <input type="date" class="form-control bg-transparent" id="datetime" placeholder="Date" data-target="#date3" data-toggle="datepicker" />
                                            <label for="datetime">Date</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input value="${e}" class="form-control bg-transparent" id="location" placeholder="No of Persons" hidden>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input value="${a}" class="form-control bg-transparent" id="forDays" placeholder="No of Persons" hidden>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="number" class="form-control bg-transparent" id="number_of_people" placeholder="No of Persons">
                                            <label for="presons">No of Persons</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control bg-transparent" placeholder="Special Request" id="message" style="height: 100px"></textarea>
                                            <label for="message">Message</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-outline-light w-100 py-3" type="submit">Book Now</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;$("#bookingModal").modal("show")}function closeBookingModal(){$("#bookingModal").modal("hide")}function sendEmail(){debugger;var e=document.getElementById("name").value;var a=document.getElementById("email").value;var o=document.getElementById("phone").value;var l=document.getElementById("datetime").value;var t=document.getElementById("location").value;var i=document.getElementById("forDays").value;var s=document.getElementById("number_of_people").value;var n=document.getElementById("message").value;emailjs.init("dpHylrOzMjDWa9VYF");var d={from_name:e,from_email:a,from_phone:o,days:i,to_name:"Taj India Tour & Travel",subject:"Booking for "+i+" for "+t,message:n+". On this date: "+l+". Number of people: "+s};emailjs.send("service_8j9vn8o","template_lr13lz8",d).then(function(e){successModal()},function(e){alert("Email failed to send",e)})}function successModal(){$("#successModal").modal("show");$("#bookingModal").modal("hide");setTimeout(function(){$("#successModal").modal("hide")},5e3)}function closeModal(){$("#successModal").modal("hide")}