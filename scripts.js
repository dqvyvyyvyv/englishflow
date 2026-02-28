// English Flow TSL Core Logic

/**
 * Countdown Timer
 * Sets a 30-minute scarcity countdown
 */
function startCountdown() {
    let timeLeft = 30 * 60; // 30 minutes in seconds

    const timerElement = document.getElementById('countdown');
    if (!timerElement) return;

    const interval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerElement.innerText =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.innerText = "PROMOÇÃO ENCERRADA";
        }

        timeLeft--;
    }, 1000);
}

/**
 * UTM Propagation
 * Captures URL parameters and appends them to all external links
 */
function appendUTMsToLinks() {
    const searchParams = window.location.search;
    if (!searchParams) return;

    // Select all links that lead to a checkout or external domain
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
        try {
            const url = new URL(link.href);
            // Combine existing search params with current ones
            const existingParams = url.search;
            const newSearch = existingParams
                ? `${existingParams}&${searchParams.substring(1)}`
                : searchParams;

            link.href = `${url.origin}${url.pathname}${newSearch}${url.hash}`;
        } catch (e) {
            console.warn('Could not append UTMs to link:', link.href);
        }
    });
}

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    appendUTMsToLinks();

    // Add tactile feedback for CTA buttons if needed
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('touchstart', function () {
            this.style.transform = 'translateY(4px)';
            this.style.boxShadow = 'none';
        });
        btn.addEventListener('touchend', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
