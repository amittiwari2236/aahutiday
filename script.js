document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    if (mobileLinks.length > 0 && mobileMenu) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling for navigation links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Birthday Countdown Logic (Tomorrow from current date at midnight)
    const timerDisplay = document.getElementById('timer-display');
    const birthdayMessage = document.getElementById('birthday-message');
    const countdownTitle = document.getElementById('countdown-title');
    const countdownSubtitle = document.getElementById('countdown-subtitle');

    if (timerDisplay || birthdayMessage) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); 
        const targetDate = tomorrow.getTime();

        const countdownFunction = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            if(daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
            
            const hoursEl = document.getElementById("hours");
            if(hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            
            const minEl = document.getElementById("minutes");
            if(minEl) minEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            
            const secEl = document.getElementById("seconds");
            if(secEl) secEl.innerText = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(countdownFunction);
                if (timerDisplay) timerDisplay.style.display = 'none';
                if (countdownTitle) countdownTitle.innerHTML = 'Happy Birthday! <i class="fa-solid fa-heart text-pink"></i>';
                if (countdownSubtitle) countdownSubtitle.style.display = 'none';
                if (birthdayMessage) {
                    birthdayMessage.style.display = 'flex';
                    setTimeout(() => {
                        birthdayMessage.classList.add('fade-in', 'visible');
                    }, 100);
                }
            }
        }, 1000);
    }

    // Gallery Logic
    const galleryBtns = document.querySelectorAll('.click-to-open');
    const modal = document.getElementById('gallery-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal) {
        if (galleryBtns.length > 0) {
            galleryBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.classList.add('show');
                    createHearts(this);
                });
            });
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Gallery slideshow
        let slideIndex = 0;
        const slides = document.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.g-dot');
        const prev = document.querySelector('.prev-slide');
        const next = document.querySelector('.next-slide');

        function showSlides(n) {
            if (!slides.length) return;
            
            if (n >= slides.length) slideIndex = 0;
            if (n < 0) slideIndex = slides.length - 1;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[slideIndex].classList.add('active');
            if (dots.length > slideIndex) {
                dots[slideIndex].classList.add('active');
            }
        }

        if (prev && next) {
            prev.addEventListener('click', () => {
                slideIndex--;
                showSlides(slideIndex);
            });

            next.addEventListener('click', () => {
                slideIndex++;
                showSlides(slideIndex);
            });
        }

        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    slideIndex = parseInt(this.getAttribute('data-index'));
                    showSlides(slideIndex);
                });
            });
        }
    }

    // Background Music Toggle
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
    
    if (animatedElements.length > 0) {
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
    }

    // Helper function for heart explosion
    function createHearts(element) {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fa-solid', 'fa-heart');
            heart.style.position = 'absolute';
            heart.style.color = '#ff6b81';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top + window.scrollY + rect.height / 2) + 'px';
            heart.style.zIndex = '3000'; // above modal
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(heart);
            
            void heart.offsetWidth;
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 50; 
            
            heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            heart.style.opacity = '0';
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
});
