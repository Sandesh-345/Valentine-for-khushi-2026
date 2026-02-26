let currentPage = 1;
const totalPages = 4;

function nextPage() {
    // Hide current page
    const currentPageElement = document.getElementById(`page${currentPage}`);
    currentPageElement.classList.remove('active');
    
    // Move to next page
    currentPage++;
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    
    // Show next page with delay for smooth transition
    setTimeout(() => {
        const nextPageElement = document.getElementById(`page${currentPage}`);
        nextPageElement.classList.add('active');
        
        // Add special effects for final page
        if (currentPage === 4) {
            createConfetti();
        }
    }, 100);
}

function sayYes() {
    const response = document.getElementById('response');
    response.innerHTML = `
        <div class="celebration">
            <h2>💕 YAY! I'm the happiest person alive! 💕</h2>
            <p>You've made me the luckiest person in the world!</p>
            <div class="hearts-explosion">
                ❤️ 💕 💖 💗 💝 ❤️ 💕 💖 💗 💝
            </div>
        </div>
    `;
    
    // Create explosion of hearts
    createHeartExplosion();
    
    // Change background to celebration colors
    document.getElementById('page4').style.background = 
        'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)';
    
    // Hide the answer buttons
    document.querySelector('.answer-buttons').style.display = 'none';
}

function sayNo() {
    const response = document.getElementById('response');
    const noButton = document.querySelector('.no-btn');
    const yesButton = document.querySelector('.yes-btn');
    
    // Make the Yes button bigger and more attractive
    yesButton.style.transform = 'scale(1.2)';
    yesButton.style.padding = '1.5rem 3rem';
    yesButton.style.fontSize = '2rem';
    
    // Move the No button randomly
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    response.innerHTML = `
        <div class="playful-response">
            <p>Are you sure? Think again! 😊</p>
        </div>
    `;
    
    // Add bounce animation to yes button
    yesButton.style.animation = 'bounce 0.5s infinite';
}

function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#ff9ff3', '#48dbfb', '#ff9ff3'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'explosion-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = '50%';
            heart.style.top = '50%';
            document.body.appendChild(heart);
            
            // Random direction
            const angle = (Math.PI * 2 * i) / heartCount;
            const velocity = 200 + Math.random() * 200;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 30);
    }
}

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #ff6b6b;
        animation: confetti-fall 3s linear;
        z-index: 1000;
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .explosion-heart {
        position: fixed;
        font-size: 2rem;
        animation: explode 2s ease-out forwards;
        z-index: 1000;
        pointer-events: none;
    }
    
    @keyframes explode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: scale(1.2) translateY(0);
        }
        50% {
            transform: scale(1.3) translateY(-10px);
        }
    }
    
    .celebration {
        animation: celebration-pulse 1s ease-out;
    }
    
    @keyframes celebration-pulse {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .hearts-explosion {
        font-size: 2rem;
        margin-top: 1rem;
        animation: hearts-rain 2s ease-out;
    }
    
    @keyframes hearts-rain {
        0% {
            transform: translateY(-20px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .playful-response {
        animation: wiggle 0.5s ease-out;
    }
    
    @keyframes wiggle {
        0%, 100% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(-5deg);
        }
        75% {
            transform: rotate(5deg);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
        nextPage();
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        // Go back to previous page
        const currentPageElement = document.getElementById(`page${currentPage}`);
        currentPageElement.classList.remove('active');
        
        currentPage--;
        const prevPageElement = document.getElementById(`page${currentPage}`);
        prevPageElement.classList.add('active');
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50 && currentPage < totalPages) {
        nextPage(); // Swipe left - next page
    }
    if (touchEndX > touchStartX + 50 && currentPage > 1) {
        // Go back to previous page
        const currentPageElement = document.getElementById(`page${currentPage}`);
        currentPageElement.classList.remove('active');
        
        currentPage--;
        const prevPageElement = document.getElementById(`page${currentPage}`);
        prevPageElement.classList.add('active');
    }
}
