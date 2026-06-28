window.initNavbar = function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const routeLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    function navigateToHash(hash) {
        if (!hash || !hash.startsWith('#')) return;
        const targetId = hash.substring(1) + '-container';
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="${hash}"], .dropdown-menu a[href="${hash}"]`);
            if (activeLink) {
                if (activeLink.classList.contains('nav-link')) {
                    activeLink.classList.add('active');
                } else if (activeLink.closest('.dropdown')) {
                    const parentLink = activeLink.closest('.dropdown').querySelector('.nav-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
            
            // Trigger loader for page transition
            if (window.triggerLoader) {
                window.triggerLoader(1000);
            }
            
            // Hide all sections and show target
            document.querySelectorAll('main > section').forEach(sec => sec.classList.remove('active'));
            targetSection.classList.add('active');
            
            // Reset forms when returning to login/signup
            if (hash === '#login' || hash === '#signup') {
                const form = targetSection.querySelector('form');
                if (form) form.reset();
                
                targetSection.querySelectorAll('.password-toggle').forEach(icon => {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                });
                
                targetSection.querySelectorAll('input').forEach(input => {
                    if (input.id.toLowerCase().includes('password')) {
                        input.type = 'password';
                    }
                });
            }
            
            // Hide navbar and footer on dashboards
            const navbarContainer = document.getElementById('navbar-container');
            const footerContainer = document.getElementById('footer-container');
            
            if (hash === '#user_dashboard' || hash === '#admin_dashboard') {
                if (navbarContainer) navbarContainer.style.display = 'none';
                if (footerContainer) footerContainer.style.display = 'none';
                
                // Update header with session email
                const emailSpan = targetSection.querySelector('.header-user-email');
                if (emailSpan) {
                    const userEmail = sessionStorage.getItem('userEmail');
                    if (userEmail) {
                        emailSpan.textContent = userEmail;
                    }
                }
                
                const nameSpan = targetSection.querySelector('.header-welcome strong');
                const titleSpan = targetSection.querySelector('.dashboard-title');
                const userName = sessionStorage.getItem('userName');
                const userRole = sessionStorage.getItem('userRole') || (hash === '#admin_dashboard' ? 'Admin' : 'User');
                
                const displayName = userName ? userName : (userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase());
                
                if (nameSpan) {
                    nameSpan.textContent = displayName;
                }
                
                if (titleSpan && hash === '#user_dashboard') {
                    titleSpan.textContent = `Welcome back, ${displayName}!`;
                }
            } else {
                if (navbarContainer) navbarContainer.style.display = 'block';
                if (footerContainer) footerContainer.style.display = 'block';
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }

    routeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const isDropdownParent = link.parentElement.classList.contains('dropdown') && link.classList.contains('nav-link');
            
            if (window.innerWidth <= 992 && isDropdownParent) {
                e.preventDefault();
                link.parentElement.classList.toggle('mobile-open');
                return;
            }

            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, href);
                navigateToHash(href);
            }
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Handle browser back button (popstate and hashchange)
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        navigateToHash(hash);
    });
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#home';
        navigateToHash(hash);
    });

    // Enforce initial state on page load
    setTimeout(() => {
        const currentHash = window.location.hash;
        if (!currentHash || currentHash === '#') {
            history.replaceState(null, null, '#home');
            navigateToHash('#home');
        } else {
            navigateToHash(currentHash);
        }
    }, 50);
};