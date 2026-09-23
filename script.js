document.addEventListener('DOMContentLoaded', () => {

  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sectionsForSpy = document.querySelectorAll('main, section.page-section');

  /* Nav style on scroll */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  });

  /* Scroll spy: update active link */
  const spyOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }, spyOptions);

  sectionsForSpy.forEach(sec => spyObserver.observe(sec));

  /* Scroll cue nudges the viewport down one screen */
  const scrollCue = document.querySelector('.scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    });
  }

  /* Subtle pointer-follow parallax on the hero illustration only —
     one orchestrated, low-amplitude effect, skipped for touch/reduced motion */
  const rig = document.querySelector('.rig');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (rig && !prefersReducedMotion && isFinePointer) {
    const stage = document.querySelector('.hero__object');
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    stage.addEventListener('mousemove', (e) => {
      const bounds = stage.getBoundingClientRect();
      const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
      targetX = relX * 16;
      targetY = relY * 12;
    });

    stage.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      rig.style.marginLeft = `${currentX}px`;
      rig.style.marginTop = `${currentY}px`;
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* Modal Logic */
  const actionBtns = document.querySelectorAll('.btn:not(.modal__form .btn)');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.querySelector('.modal__close');
  const modalForm = document.querySelector('.modal__form');

  if (loginModal) {
    actionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('is-open');
      });
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle login/signup logic here
      loginModal.classList.remove('is-open');
      alert('Thanks for your submission! We will be in touch.');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      loginModal.classList.remove('is-open');
    });
  }

  // Close modal when clicking outside
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('is-open');
      }
    });
  }

  /* Scroll animations for sections */
  const sections = document.querySelectorAll('.page-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});
