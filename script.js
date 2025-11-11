// AssistaOS interactions: reveal, parallax, tilt
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll using IntersectionObserver
  function setupReveals() {
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealEls.forEach((el) => observer.observe(el));
  }

  // Simple parallax on mouse move for elements with data-parallax
  function setupParallax() {
    const parallaxScope = document.querySelector('.hero-visual');
    if (!parallaxScope) return;
    const parallaxEls = Array.from(parallaxScope.querySelectorAll('[data-parallax]'));
    if (parallaxEls.length === 0) return;

    let rafId = null;
    let lastEvent = null;

    function onMove(e) {
      lastEvent = e;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const rect = parallaxScope.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (lastEvent.clientX - cx) / rect.width;  // -0.5..0.5
        const dy = (lastEvent.clientY - cy) / rect.height; // -0.5..0.5
        parallaxEls.forEach((el) => {
          const depth = parseFloat(el.getAttribute('data-depth') || '0.05');
          const tx = -dx * depth * 100; // px
          const ty = -dy * depth * 100; // px
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        });
      });
    }

    function reset() {
      parallaxEls.forEach((el) => {
        el.style.transform = '';
      });
    }

    if (!prefersReduced) {
      parallaxScope.addEventListener('mousemove', onMove);
      parallaxScope.addEventListener('mouseleave', reset);
    }
  }

  // Hover tilt for cards and preview
  function setupTilt() {
    const tiltEls = Array.from(document.querySelectorAll('[data-tilt]'));
    if (tiltEls.length === 0 || prefersReduced) return;

    tiltEls.forEach((el) => {
      let rafId = null;
      let rect = null;

      function updateRect() {
        rect = el.getBoundingClientRect();
      }

      function onEnter() {
        updateRect();
      }

      function onMove(e) {
        if (!rect) updateRect();
        const px = (e.clientX - rect.left) / rect.width;  // 0..1
        const py = (e.clientY - rect.top) / rect.height; // 0..1
        const rotX = (0.5 - py) * 10; // deg
        const rotY = (px - 0.5) * 10; // deg

        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = null;
          el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0) scale3d(1.01,1.01,1.01)`;
        });
      }

      function onLeave() {
        el.style.transform = '';
      }

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      window.addEventListener('resize', updateRect);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupReveals();
    setupParallax();
    setupTilt();
  });
})();
