window.initTestimonials = function() {
    const section = document.querySelector('.testimonial-slider-section');
    if (!section) return;
    const track = section.querySelector('.slider-track');
    const slides = section.querySelectorAll('.slide');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');
    const sliderContainer = section.querySelector('.slider-container');
    
    if(!track || !slides.length) return;

    let currentIndex = 0;
    let autoPlayInterval;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, idx) => {
            if (idx === currentIndex) slide.classList.add('active');
            else slide.classList.remove('active');
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    if(sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
};
