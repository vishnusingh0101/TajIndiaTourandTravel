document.addEventListener("DOMContentLoaded", function () {
    console.log("Cookie banner initialized");

    window.acceptAllCookies = function () {
        console.log("User accepted all cookies");
        updateConsentPreferences({ ads: true, analytics: true });
        hideBanner();
    };

    window.showCookiePreferences = function () {
        console.log("User clicked customize");
        document.getElementById('cookie-banner').style.display = 'none';
        document.getElementById('cookie-preferences').style.display = 'block';
    };

    window.saveCookiePreferences = function () {
        const adsChecked = document.getElementById('ads').checked;
        const analyticsChecked = document.getElementById('analytics').checked;
        console.log("User preferences saved:", { ads: adsChecked, analytics: analyticsChecked });
        updateConsentPreferences({ ads: adsChecked, analytics: analyticsChecked });
        hideBanner();
    };

    function hideBanner() {
        document.getElementById('cookie-banner').style.display = 'none';
        document.getElementById('cookie-preferences').style.display = 'none';
    }
});