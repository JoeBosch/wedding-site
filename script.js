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
            envelopeWrapper.classList.add('final');
        }, 1600);
    });
});

