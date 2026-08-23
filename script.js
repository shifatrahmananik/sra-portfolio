document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal observer
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  
  reveals.forEach(el => io.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          } else {
            a.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-90px 0px -50% 0px' });
  
  sections.forEach(s => navObserver.observe(s));
});
