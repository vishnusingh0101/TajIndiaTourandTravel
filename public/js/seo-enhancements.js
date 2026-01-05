/**
 * SEO and Performance Enhancement Script
 * For Taj India Tour and Travel Website
 */

// ============ Lazy Loading Images ============
document.addEventListener('DOMContentLoaded', function() {
    // Add loading="lazy" to images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
    });
    
    // IntersectionObserver for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src || entry.target.src;
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ============ Add Alt Text to Images ============
function ensureImageAltText() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
            const filename = img.src.split('/').pop().split('.')[0];
            img.setAttribute('alt', filename.replace(/-/g, ' ') || `Image ${index + 1}`);
        }
    });
}

// ============ Breadcrumb Schema ============
function addBreadcrumbSchema(breadcrumbArray) {
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbArray.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaMarkup);
    document.head.appendChild(script);
}

// ============ Organization Schema ============
function addOrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Taj India Tour and Travel",
        "url": "https://tajindiatourandtravel.com",
        "logo": "https://tajindiatourandtravel.com/img/logo/logo.png",
        "description": "Taj India Tour and Travel offers luxury, personalized tours across India's top destinations.",
        "telephone": "+91-875-091-5435",
        "email": "tajindiatourandtravel@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ram Bazar Mori Gate",
            "addressLocality": "Delhi",
            "addressRegion": "Delhi",
            "postalCode": "110006",
            "addressCountry": "IN"
        },
        "areaServed": ["IN"],
        "priceRange": "$$",
        "image": "https://tajindiatourandtravel.com/img/taj.jpg"
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// ============ Add NAV Landmarks for Accessibility ============
function improveAccessibility() {
    // Ensure main content has proper landmark
    const main = document.querySelector('main') || document.querySelector('.container');
    if (main && !main.hasAttribute('role')) {
        main.setAttribute('role', 'main');
    }
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.setAttribute('tabindex', '1');
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content if not present
    if (main && !main.id) {
        main.id = 'main-content';
    }
}

// ============ Performance Monitoring ============
function logWebVitals() {
    // Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('LCP:', entry.renderTime || entry.loadTime);
        }
    });
    observer.observe({entryTypes: ['largest-contentful-paint']});
    
    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('FID:', entry.processingDuration);
        }
    });
    fidObserver.observe({entryTypes: ['first-input']});
}

// ============ Initialize All Enhancements ============
document.addEventListener('DOMContentLoaded', function() {
    ensureImageAltText();
    improveAccessibility();
    
    // Add organization schema on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        addOrganizationSchema();
    }
    
    // Log web vitals (only in development)
    if (window.location.hostname === 'localhost') {
        logWebVitals();
    }
});

// ============ Prefetch and Preload ============
function optimizeLinkLoading() {
    // Prefetch important pages
    const prefetchLinks = [
        '/about.html',
        '/package.html',
        '/contact.html'
    ];
    
    prefetchLinks.forEach(link => {
        const el = document.createElement('link');
        el.rel = 'prefetch';
        el.href = link;
        document.head.appendChild(el);
    });
    
    // Preload critical fonts
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800'
    ];
    
    criticalFonts.forEach(font => {
        const el = document.createElement('link');
        el.rel = 'preload';
        el.as = 'style';
        el.href = font;
        document.head.appendChild(el);
    });
}

// Initialize link optimization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeLinkLoading);
} else {
    optimizeLinkLoading();
}
