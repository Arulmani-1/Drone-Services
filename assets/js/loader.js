window.triggerLoader = function(duration = 3000, callback = null) {
    const preloader = document.getElementById("preloader");
    const percentageEl = document.getElementById("loader-percentage");
    
    // Reset and show preloader
    preloader.style.display = "flex";
    
    // Force reflow to ensure display:flex is applied before removing hidden class (if transitioning)
    preloader.offsetHeight; 
    preloader.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    
    let percent = 0;
    const targetTime = duration;
    const intervalTime = 30; // ms per frame
    const increment = (100 / (targetTime / intervalTime));

    const counter = setInterval(() => {
        percent += increment;
        if (percent >= 100) {
            percent = 100;
            clearInterval(counter);
            setTimeout(() => {
                preloader.classList.add("hidden");
                document.body.style.overflow = "auto";
                setTimeout(() => {
                    preloader.style.display = "none";
                    // Trigger animations if available
                    if (window.initAnimations) window.initAnimations();
                    if (callback) callback();
                }, 800);
            }, 200);
        }
        if (percentageEl) {
            percentageEl.innerText = Math.floor(percent) + "%";
        }
    }, intervalTime);
};

document.addEventListener("DOMContentLoaded", () => {
    // Initial load takes 3 seconds
    window.triggerLoader(3000);
});