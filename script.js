document.addEventListener('DOMContentLoaded', function() {
    // Handle loading screen
    handleLoadingScreen();
    
    // Initialize particles.js
    initParticles();
    
    // Set up countdown timer
    initCountdown();
    
    // Fetch TON price
    fetchTONPrice();
    
    // Set up modal functionality
    initModal();
    
    // Set up form submissions
    initForms();
    
    // Add scroll animations
    initScrollAnimations();
});

// Initialize particles background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#0088CC'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#0088CC',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Set up countdown timer to 3 months from now
function initCountdown() {
    // Set the date 3 months from now
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setMonth(currentDate.getMonth() + 3);
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the target date
        const distance = targetDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").textContent = formatTime(days);
        document.getElementById("hours").textContent = formatTime(hours);
        document.getElementById("minutes").textContent = formatTime(minutes);
        document.getElementById("seconds").textContent = formatTime(seconds);
        
        // If the countdown is finished, clear the interval
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").innerHTML = "LAUNCHED!";
        }
    }, 1000);
}

// Format time to always have 2 digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Fetch TON price from CoinGecko API
function fetchTONPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data['the-open-network'].usd;
            document.getElementById('ton-price-display').textContent = `$${price.toFixed(2)} USD`;
        })
        .catch(error => {
            console.error('Error fetching TON price:', error);
            document.getElementById('ton-price-display').textContent = '$5.42 USD';
        });
}

// Initialize modal functionality
function initModal() {
    const modal = document.getElementById('notify-modal');
    const notifyBtn = document.querySelector('.notify-button');
    const closeBtn = document.querySelector('.close-modal');
    
    notifyBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        // Add fade-in animation
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.opacity = 1;
        }, 10);
    });
    
    closeBtn.addEventListener('click', function() {
        // Add fade-out animation
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            // Add fade-out animation
            modal.style.opacity = 0;
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize form submissions
function initForms() {
    const notifyForm = document.getElementById('notify-form');
    const modalForm = document.getElementById('modal-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = notifyForm.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            const submitButton = notifyForm.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing! We\'ll keep you updated.');
                notifyForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telegram = document.getElementById('telegram').value;
            
            // Simulate form submission
            const submitButton = modalForm.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                const modal = document.getElementById('notify-modal');
                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.display = 'none';
                    showNotification(`Thank you, ${name}! You're on our early access list.`);
                    modalForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 300);
            }, 1500);
        });
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(52, 199, 89, 0.9)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'all 0.3s ease';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Initialize scroll animations
function initScrollAnimations() {
    // Get all elements that need animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .tech-feature, .about-text p, .ton-info, .newsletter-content');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Set initial styles and observe elements
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Handle loading screen animation and hiding
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time (you can replace this with actual loading logic)
    setTimeout(() => {
        // Fade out loading screen
        loadingScreen.style.opacity = '0';
        
        // Hide loading screen after animation completes
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';
        }, 500);
    }, 3000); // 3 seconds loading time
}

// Add some fun interactive elements
function addInteractiveElements() {
    // Make TON coins interactive
    const tonCoins = document.querySelectorAll('.ton-coin-img, .floating-coin');
    
    tonCoins.forEach(coin => {
        coin.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2) rotate(20deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        coin.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
        
        coin.addEventListener('click', function() {
            // Create a spinning animation on click
            this.style.animation = 'spin 0.5s linear';
            
            // Create sparkle effect
            createSparkleEffect(this);
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Create sparkle effect around an element
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Style the sparkle
        sparkle.style.position = 'fixed';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.backgroundColor = '#00FFFF';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        // Calculate random position around the element
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const posX = centerX + Math.cos(angle) * distance;
        const posY = centerY + Math.sin(angle) * distance;
        
        sparkle.style.left = `${posX}px`;
        sparkle.style.top = `${posY}px`;
        
        // Add to document
        document.body.appendChild(sparkle);
        
        // Animate and remove
        setTimeout(() => {
            sparkle.style.transition = 'all 0.6s ease';
            sparkle.style.transform = `translate(${Math.cos(angle) * 20}px, ${Math.sin(angle) * 20}px)`;
            sparkle.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(sparkle);
            }, 600);
        }, 10);
    }
}

// Call this after DOM is loaded
setTimeout(addInteractiveElements, 1000);

// Add a typing effect to the hero heading
function addTypingEffect() {
    const headingElement = document.querySelector('.hero-content h1');
    if (!headingElement) return;
    
    const originalText = headingElement.textContent;
    headingElement.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < originalText.length) {
            headingElement.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // Add blinking cursor effect after typing is complete
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            cursor.style.animation = 'blink 1s infinite';
            headingElement.appendChild(cursor);
            
            // Remove cursor after a few seconds
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 3000);
        }
    }, 100);
}

// Call typing effect after a short delay
setTimeout(addTypingEffect, 500);

// Add matrix-like effect on hover for tech features
function addMatrixEffect() {
    const techFeatures = document.querySelectorAll('.tech-feature');
    
    techFeatures.forEach(feature => {
        feature.addEventListener('mouseover', function() {
            const text = this.querySelector('span').textContent;
            const span = this.querySelector('span');
            
            // Save original text
            span.dataset.originalText = text;
            
            // Start matrix effect
            let iteration = 0;
            const maxIterations = 10;
            
            const interval = setInterval(() => {
                span.textContent = text.split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    })
                    .join('');
                
                if (iteration >= text.length) {
                    clearInterval(interval);
                    span.textContent = text;
                }
                
                iteration += 1 / 3;
            }, 30);
            
            // Store interval ID to clear it if needed
            this.dataset.matrixInterval = interval;
        });
        
        feature.addEventListener('mouseout', function() {
            // Clear interval if it exists
            if (this.dataset.matrixInterval) {
                clearInterval(parseInt(this.dataset.matrixInterval));
                
                // Restore original text
                const span = this.querySelector('span');
                if (span.dataset.originalText) {
                    span.textContent = span.dataset.originalText;
                }
            }
        });
    });
}

// Call matrix effect setup
setTimeout(addMatrixEffect, 1000);
