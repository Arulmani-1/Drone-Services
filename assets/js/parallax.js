window.initParallax = function() {
    const parallaxElements = document.querySelectorAll('.parallax-el');
    const heroVideo = document.querySelector('.hero-video');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Video Parallax
        if(heroVideo) {
            heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.4}px))`;
        }
        
        // Element Parallax
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.1;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
};