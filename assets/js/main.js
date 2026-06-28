async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not fetch ${url}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        // Dispatch event when component is loaded
        const event = new CustomEvent('componentLoaded', { detail: { id, url } });
        document.dispatchEvent(event);
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const cb = new Date().getTime(); // Cache buster
    // Dynamically load components
    await Promise.all([
        loadComponent('navbar-container', 'components/navbar.html?v=' + cb),
        loadComponent('home-container', 'components/home.html?v=' + cb),
        loadComponent('about-container', 'components/about.html?v=' + cb),
        loadComponent('pilot_view-container', 'components/pilot_view.html?v=' + cb),
        loadComponent('testimonials-container', 'components/testimonials.html?v=' + cb),
        loadComponent('tips-container', 'components/tips.html?v=' + cb),
        loadComponent('license-container', 'components/drone_license.html?v=' + cb),
        loadComponent('construction-container', 'components/under.html?v=' + cb),
        loadComponent('error404-container', 'components/404.html?v=' + cb),
        loadComponent('services-container', 'components/services.html?v=' + cb),
        loadComponent('news-container', 'components/news.html?v=' + cb),
        loadComponent('products-container', 'components/products.html?v=' + cb),
        loadComponent('cart-container', 'components/cart.html?v=' + cb),
        loadComponent('checkout-container', 'components/checkout.html?v=' + cb),
        loadComponent('account-container', 'components/account.html?v=' + cb),
        loadComponent('contact-container', 'components/contact.html?v=' + cb),
        loadComponent('location-container', 'components/location.html?v=' + cb),
        loadComponent('login-container', 'components/login.html?v=' + cb),
        loadComponent('signup-container', 'components/signup.html?v=' + cb),
        loadComponent('user_dashboard-container', 'components/user_dashboard.html?v=' + cb),
        loadComponent('admin_dashboard-container', 'components/admin_dashboard.html?v=' + cb),
        loadComponent('footer-container', 'components/footer.html?v=' + cb)
    ]);
    
    // Initialize functionalities after all components are loaded
    if (window.initNavbar) window.initNavbar();
    if (window.initProducts) window.initProducts();
    if (window.initContact) window.initContact();
    if (window.initAnimations) window.initAnimations();
    if (window.initParallax) window.initParallax();
    if (window.initCounters) window.initCounters();
    if (window.initTestimonials) window.initTestimonials();
});

// License Tabs Event Delegation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('license-tab')) {
        const tabs = document.querySelectorAll('.license-tab');
        const panes = document.querySelectorAll('.license-tab-pane');
        
        tabs.forEach(tab => tab.classList.remove('active'));
        panes.forEach(pane => pane.style.display = 'none');
        
        e.target.classList.add('active');
        const targetId = e.target.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
            targetPane.style.display = 'block';
        }
    }
});

// News Carousel Logic
window.currentCarouselSlide = 0;
window.moveCarousel = function(step) {
    const track = document.getElementById('newsCarouselTrack');
    if (!track) return;
    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    window.currentCarouselSlide = (window.currentCarouselSlide + step + totalSlides) % totalSlides;
    updateCarousel(track);
};

window.setCarouselSlide = function(index) {
    const track = document.getElementById('newsCarouselTrack');
    if (!track) return;
    window.currentCarouselSlide = index;
    updateCarousel(track);
};

function updateCarousel(track) {
    track.style.transform = `translateX(-${window.currentCarouselSlide * 100}%)`;
    
    // Update dots
    const dots = track.parentElement.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx === window.currentCarouselSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Authentication Handlers
window.handleSignup = function(e, roleId, nameId, emailId) {
    e.preventDefault();
    const name = document.getElementById(nameId).value;
    sessionStorage.setItem('userName', name);
    window.location.hash = '#login';
};

window.handleLogin = function(e, roleId, emailId) {
    e.preventDefault();
    const role = document.getElementById(roleId).value;
    const email = document.getElementById(emailId).value;
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userRole', role);
    window.location.hash = role === 'admin' ? '#admin_dashboard' : '#user_dashboard';
};

window.handleLogout = function(e) {
    if (e) e.preventDefault();
    sessionStorage.removeItem('userEmail');
    window.location.hash = '#home';
};

window.toggleSidebar = function(forceClose) {
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
        if (forceClose === true) {
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.toggle('show');
        }
    }
};

window.togglePasswordVisibility = function(inputId, iconElement) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    }
};