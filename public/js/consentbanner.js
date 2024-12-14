export function initCookieConsent() {
    console.log("Initializing cookie banner");

    // Inject CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
        #cookie-banner, #cookie-preferences {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #f8f9fa;
            padding: 15px;
            z-index: 1000;
            box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
        }
        #cookie-banner { display: block; }
        #cookie-preferences { display: none; }
        #cookie-banner p, #cookie-preferences p {
            margin: 0;
            font-size: 14px;
            color: #333;
        }
        #cookie-banner button, #cookie-preferences button {
            margin: 5px;
            padding: 8px 15px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #cookie-banner button:hover, #cookie-preferences button:hover {
            background-color: #0056b3;
        }
        #cookie-preferences label {
            font-size: 14px;
            display: block;
            margin: 5px 0;
        }
    `;
    document.head.appendChild(style);

    // Inject HTML structure
    const bannerHTML = `
        <div id="cookie-banner">
            <p>
                We use cookies to improve your experience. 
                <button onclick="acceptAllCookies()">Accept All</button>
                <button onclick="showCookiePreferences()">Customize</button>
            </p>
        </div>
        <div id="cookie-preferences">
            <p>
                Customize your cookie preferences:
                <label><input type="checkbox" id="ads"> Ads</label>
                <label><input type="checkbox" id="analytics"> Analytics</label>
                <button onclick="saveCookiePreferences()">Save Preferences</button>
            </p>
        </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = bannerHTML;
    document.body.appendChild(container);

    window.acceptAllCookies = function () {
        savePreferences({ ads: true, analytics: true });
    };

    window.showCookiePreferences = function () {
        document.getElementById('cookie-banner').style.display = 'none';
        document.getElementById('cookie-preferences').style.display = 'block';
    };

    window.saveCookiePreferences = function () {
        const preferences = {
            ads: document.getElementById('ads').checked,
            analytics: document.getElementById('analytics').checked,
        };
        savePreferences(preferences);
    };

    function savePreferences(preferences) {
        console.log("Preferences saved:", preferences);
        document.cookie = `consent=${JSON.stringify(preferences)}; path=/; max-age=${365 * 24 * 60 * 60}`;
        hideBanner();
    }

    function hideBanner() {
        document.getElementById('cookie-banner').style.display = 'none';
        document.getElementById('cookie-preferences').style.display = 'none';
    }

    // Check existing consent and hide banner if already provided
    const consentCookie = document.cookie.split('; ').find(row => row.startsWith('consent='));
    if (consentCookie) hideBanner();
}
