document.addEventListener('DOMContentLoaded', function() {
    // Initialize VelocityFX
    const vfx = new VelocityFX({
        threshold: 0.1,
        rootMargin: '20px',
        duration: 300,
        easing: 'ease-out'
    });

    // Initialize all animations
    vfx.init();

    // Initialize entry animations
    document.querySelectorAll('[vfx-animate]').forEach(element => {
        vfx.observe(element);
    });

    // Initialize hover effects
    document.querySelectorAll('[vfx-hover]').forEach(element => {
        const effect = element.getAttribute('vfx-hover');
        vfx.hover(element, {
            animation: effect,
            duration: 300
        });
    });

    // Initialize click animations
    document.querySelectorAll('[vfx-click]').forEach(element => {
        const effect = element.getAttribute('vfx-click');
        vfx.click(element, {
            animation: effect,
            duration: 400
        });
    });

    // Initialize sequence animations
    document.querySelectorAll('[vfx-sequence]').forEach(container => {
        const delay = parseInt(container.getAttribute('vfx-sequence-delay')) || 200;
        const direction = container.getAttribute('vfx-sequence-direction') || 'forward';
        vfx.sequence(container, {
            delay: delay,
            direction: direction,
            children: '[vfx-animate]'
        });
    });

    // Initialize parallax effects
    document.querySelectorAll('[vfx-parallax]').forEach(element => {
        const speed = parseFloat(element.getAttribute('vfx-parallax'));
        const perspective = element.getAttribute('vfx-parallax-perspective');
        vfx.parallax(element, {
            speed: speed,
            perspective: perspective ? parseInt(perspective) : null
        });
    });

    // Initialize themes
    document.querySelectorAll('[vfx-theme]').forEach(element => {
        const theme = element.getAttribute('vfx-theme');
        vfx.theme(element, theme);
    });

    // Add scroll listener for updates
    window.addEventListener('scroll', () => {
        vfx.update();
    });

    // Add resize listener for responsive updates
    window.addEventListener('resize', () => {
        vfx.update();
    });

    // Add intersection observer for entry animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                vfx.animate(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });

    document.querySelectorAll('[vfx-animate]').forEach(element => {
        observer.observe(element);
    });

    // Handle state-based animations
    document.querySelectorAll('[vfx-state]').forEach(element => {
        const states = element.getAttribute('vfx-state').split(' ');
        states.forEach(state => {
            const [trigger, animation] = state.split(':');
            vfx.state(element, {
                trigger: trigger,
                animation: animation
            });
        });
    });

    // Initialize custom animations
    vfx.defineAnimation('custom-fade', {
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 500,
        easing: 'ease-out'
    });

    // Add event listeners for animation events
    document.addEventListener('vfx:animate:start', (event) => {
        const { element, animation } = event.detail;
        console.log(`Animation ${animation} started on`, element);
    });

    document.addEventListener('vfx:animate:end', (event) => {
        const { element, animation } = event.detail;
        console.log(`Animation ${animation} completed on`, element);
    });

    // Force initial update
    vfx.update();
});