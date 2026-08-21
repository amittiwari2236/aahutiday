document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Countdown Timer Logic
    // Set to next Valentine's Day or Anniversary (Adjust date here)
    const currentYear = new Date().getFullYear();
    // Defaulting to Valentine's Day next year or current year if it hasn't passed
    let targetDate = new Date(`Feb 14, ${currentYear} 00:00:00`).getTime();
    if (new Date().getTime() > targetDate) {
        targetDate = new Date(`Feb 14, ${currentYear + 1} 00:00:00`).getTime();
    }

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
    }, 1000);

    // Surprise Button Interaction
    const surpriseBtn = document.querySelector('.click-to-open');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            // Create a beautiful heart explosion effect
            createHearts(this);
            
            // Show romantic alert
            setTimeout(() => {
                alert("You are my today and all of my tomorrows. I love you more than words can express! ❤️✨");
            }, 500);
        });
    }

    // Background Music Toggle (Optional feature)
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
                musicBtn.style.color = '';
            } else {
                // Handle potential autoplay blocking
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
                        musicBtn.style.color = 'var(--primary-pink)';
                    })
                    .catch(error => {
                        console.log("Audio play failed: ", error);
                        alert("Please add an audio source in the HTML to play music.");
                    });
                }
            }
            isPlaying = !isPlaying;
        });
    }

    // Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Helper function for heart explosion
    function createHearts(button) {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fa-solid', 'fa-heart');
            heart.style.position = 'absolute';
            heart.style.color = '#ff6b81';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = (button.getBoundingClientRect().left + button.offsetWidth / 2) + 'px';
            heart.style.top = (button.getBoundingClientRect().top + button.offsetHeight / 2) + 'px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(heart);
            
            // Force reflow
            void heart.offsetWidth;
            
            // Animate
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 50; // slightly upwards
            
            heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            heart.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
});
