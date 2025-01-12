$(document).ready(function () {
    // Initialize Owl Carousel
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
    });

    // Testimonial Carousel (Multiple Items)
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1, // Show 1 item on small screens
            },
            768: {
                items: 2, // Show 2 items on tablets
            },
            992: {
                items: 3, // Show 3 items on desktops
            },
        },
    });

    // Scroll button functionality for horizontal scrolling of the package items
    $(".scroll-btn.left").on("click", function () {
        scrollLeft(); // Call the scrollLeft function
    });

    $(".scroll-btn.right").on("click", function () {
        scrollRight(); // Call the scrollRight function
    });
});

// Scroll Functions (for the package card scrolling)
function scrollLeft() {
    const container = document.querySelector('.package-item-container');
    if (container) {
        container.scrollBy({
            left: -300, // Scroll to the left by 300px
            behavior: 'smooth' // Smooth scrolling effect
        });
    }
}

function scrollRight() {
    const container = document.querySelector('.package-item-container');
    if (container) {
        container.scrollBy({
            left: 300, // Scroll to the right by 300px
            behavior: 'smooth' // Smooth scrolling effect
        });
    }
}

// Additional Scripts for other functionalities
(function ($) {
    "use strict";

    // Spinner (removes the loading spinner after a delay)
    const spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner();

    // Initialize WOW.js for animation effects on scroll
    new WOW().init();

    // Sticky Navbar functionality when scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $(".navbar").addClass("sticky-top shadow-sm");
        } else {
            $(".navbar").removeClass("sticky-top shadow-sm");
        }
    });

    // Dropdown on Mouse Hover for larger screens
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to Top Button functionality
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });

    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });
})(jQuery);
