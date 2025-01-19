document.addEventListener("DOMContentLoaded", () => {
    const oneDayPackagesContainer = document.getElementById("one-day-packages-container");
    const otherPackagesContainer = document.getElementById("other-packages-container");

    // Function to generate package HTML
    function generatePackageHTML(pkg, index) {
        return `
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${0.1 + index * 0.2}s">
                <div class="package-item shadow rounded">
                    <div class="overflow-hidden rounded-top position-relative">
                        <img class="img-fluid custom-img" src="${pkg.image}" alt="${pkg.title}">
                        <div class="price-tag position-absolute bg-danger text-white px-3 py-1 rounded"
                            style="top: 10px; right: 10px; font-weight: bold; font-size: 1rem;">
                            From ${pkg.price}
                        </div>
                    </div>
                    <div class="text-center p-4">
                        <h5 class="fw-bold mb-3">${pkg.title}</h5>
                        <div class="d-flex flex-column align-items-start mb-3">
                            <div class="badge bg-light text-primary mb-2 p-2 fs-5 w-100">
                                <i class="fa fa-map-marker-alt fs-5 me-2"></i> ${pkg.location}
                            </div>
                            <div class="badge bg-light text-primary mb-2 p-2 fs-5 w-100">
                                <i class="fa fa-calendar-alt fs-5 me-2"></i> ${pkg.duration}
                            </div>
                            <div class="badge bg-light text-primary p-2 fs-5 w-100">
                                <i class="fa fa-user fs-5 me-2"></i> ${pkg.audience}
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <a href="${pkg.detailsLink}"
                               class="btn btn-outline-primary px-4 rounded-start"
                               title="View Details of ${pkg.title}">
                                View Details
                            </a>
                            <a href="#" class="btn btn-primary px-4 rounded-end"
                               onclick="openBookingModal('${pkg.bookingInfo.packageName}', '${pkg.bookingInfo.duration}')"
                               title="Get a Quote for ${pkg.title}">
                                Book
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to render packages
    function renderPackages(packages, container) {
        if (!Array.isArray(packages) || packages.length === 0) {
            console.log("No packages available");
            return;
        }

        packages.forEach((pkg, index) => {
            container.innerHTML += generatePackageHTML(pkg, index);
        });
    }

    // Render packages
    if (typeof onedaypackages !== "undefined") {
        renderPackages(onedaypackages, oneDayPackagesContainer);
    } else {
        console.log("One day packages not found");
    }

    if (typeof otherpackages !== "undefined") {
        renderPackages(otherpackages, otherPackagesContainer);
    } else {
        console.log("Other packages not found");
    }
});