document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const clickHint = document.getElementById('clickHint');
    
    let isOpened = false;

    envelopeWrapper.addEventListener('click', (e) => {
        // Don't trigger if clicking the RSVP button after opened
        if (e.target.classList.contains('rsvp-button')) {
            return;
        }
        
        if (isOpened) return;
        isOpened = true;

        // Step 1: Open the envelope flap
        envelopeWrapper.classList.add('opened');
        
        // Create confetti
        createConfetti();

        // Step 2: After flap opens, swap flaps and slide envelope down
        setTimeout(() => {
            envelopeWrapper.classList.add('flap-behind');
            envelopeWrapper.classList.add('sliding');
        }, 600);

        // Step 3: Final state - letter centered
        setTimeout(() => {
            const letter = document.getElementById('letter');
            const letterRect = letter.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const letterHeight = letterRect.height;
            const currentTop = letterRect.top;
            const maxHeight = viewportHeight * 0.9;
            
            let targetTop;
            if (letterHeight > maxHeight) {
                // Letter will scroll, position at top with padding
                targetTop = viewportHeight * 0.05;
            } else {
                // Center the letter
                targetTop = (viewportHeight - letterHeight) / 2;
            }
            
            const moveY = targetTop - currentTop;
            
            letter.style.transform = `translateX(-50%) translateY(calc(-40px + ${moveY}px))`;
            envelopeWrapper.classList.add('final');
        }, 1400);
    });
    
    function createConfetti() {
        const confettiContainer = document.getElementById('confettiContainer');
        const envelopeRect = document.getElementById('envelope').getBoundingClientRect();
        const confettiCount = 30;
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random color
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size
            const size = Math.random() * 8 + 6;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Start position at envelope center
            const startX = envelopeRect.left + envelopeRect.width / 2;
            const startY = envelopeRect.top + envelopeRect.height / 2;
            
            // Random direction and distance for initial pop
            const angle = (Math.PI * 2 * i) / confettiCount + (Math.random() - 0.5) * 0.5;
            const popVelocity = Math.random() * 150 + 100;
            const popX = Math.cos(angle) * popVelocity;
            const popY = Math.sin(angle) * popVelocity - 150; // Pop upward
            
            // Random horizontal drift while falling
            const driftX = (Math.random() - 0.5) * 300;
            
            // Random rotation
            const rotation = Math.random() * 720 - 360;
            
            // Animation durations
            const popDuration = 0.4;
            const fallDuration = Math.random() * 2 + 2;
            
            confetti.style.left = startX + 'px';
            confetti.style.top = startY + 'px';
            confetti.style.transform = `translate(0, 0) rotate(0deg)`;
            confetti.style.opacity = '1';
            
            confettiContainer.appendChild(confetti);
            
            // Animate after a tiny delay to ensure it's rendered
            setTimeout(() => {
                // First: pop upward
                confetti.style.transition = `transform ${popDuration}s ease-out`;
                confetti.style.transform = `translate(${popX}px, ${popY}px) rotate(${rotation * 0.3}deg)`;
                
                // Then: fall down
                setTimeout(() => {
                    const finalY = window.innerHeight + 200;
                    confetti.style.transition = `transform ${fallDuration}s ease-in, opacity ${fallDuration}s ease-out`;
                    confetti.style.transform = `translate(${popX + driftX}px, ${finalY}px) rotate(${rotation}deg)`;
                    confetti.style.opacity = '0';
                    
                    // Remove after animation
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, fallDuration * 1000);
                }, popDuration * 1000);
            }, 10);
        }
    }
});

