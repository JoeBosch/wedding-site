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

        // Step 2: After flap opens, move flap behind letter then slide envelope down
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
            const targetTop = (viewportHeight - letterHeight) / 2;
            const moveY = targetTop - currentTop;
            
            letter.style.transform = `translateX(-50%) translateY(calc(-40px + ${moveY}px))`;
            envelopeWrapper.classList.add('final');
        }, 1400);
    });
});

