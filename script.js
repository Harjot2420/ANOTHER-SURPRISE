document.addEventListener('DOMContentLoaded', function() {
    const letter = document.getElementById('letter');
    const heartbeatSound = document.getElementById('heartbeat');
    
    // Add heartbeat animation to the bear
    document.querySelector('.bear').classList.add('heartbeat');
    
    // Play heartbeat sound on loop
    heartbeatSound.loop = true;
    heartbeatSound.volume = 0.3;
    
    // Try to play sound (may be blocked by browser autoplay policies)
    const playSound = () => {
        const promise = heartbeatSound.play();
        if (promise !== undefined) {
            promise.catch(error => {
                console.log("Autoplay prevented. Please interact with the page to play sound.");
            });
        }
    };
    
    // Play sound when user interacts with the page
    document.body.addEventListener('click', function() {
        playSound();
    }, { once: true });
    
    // Letter click handler
    letter.addEventListener('click', function() {
        this.classList.toggle('open');
        
        // Add some confetti effect when letter opens
        if (this.classList.contains('open')) {
            createHearts();
        }
    });
    
    // Create floating hearts animation
    function createHearts() {
        const colors = ['#ff6b81', '#ff8e9e', '#ffb3c1', '#ffd8e1'];
        
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.style.position = 'absolute';
            heart.style.width = '20px';
            heart.style.height = '20px';
            heart.style.background = colors[Math.floor(Math.random() * colors.length)];
            heart.style.borderRadius = '0 50% 50% 50%';
            heart.style.transform = 'rotate(45deg)';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.opacity = '0.7';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            document.body.appendChild(heart);
            
            const animation = heart.animate([
                { top: window.innerHeight + 'px', opacity: 0.7 },
                { top: -20 + 'px', opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => heart.remove();
        }
    }
    
    // Create some floating hearts in the background occasionally
    setInterval(createHearts, 3000);
});