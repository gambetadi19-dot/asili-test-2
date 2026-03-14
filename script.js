// script.js - Consolidated across all pages
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // Active nav state across desktop and mobile menus
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('#')[0];
    link.classList.toggle('active', linkPage === currentPage);
  });

  // Rotating Word (Home page only)
  const rotatingWord = document.getElementById('rotatingWord');
  if (rotatingWord) {
    const words = ['growth', 'impact', 'compliance', 'innovation', 'legacy'];
    let wordIndex = 0;
    
    rotatingWord.style.transition = 'all .35s ease';
    
    setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.style.opacity = 0;
      rotatingWord.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        rotatingWord.textContent = words[wordIndex];
        rotatingWord.style.opacity = 1;
        rotatingWord.style.transform = 'translateY(0)';
      }, 220);
    }, 2400);
  }

  // Quote Toggle (About page)
  const quoteToggle = document.getElementById('quoteToggle');
  const quoteReveal = document.getElementById('quoteReveal');
  
  if (quoteToggle && quoteReveal) {
    quoteToggle.addEventListener('click', () => {
      const isOpen = quoteReveal.classList.toggle('open');
      quoteToggle.setAttribute('aria-expanded', String(isOpen));
      quoteToggle.textContent = isOpen ? 'Hide founder message' : 'Reveal founder message';
    });
  }

  // Filter Chips (Services page)
  const chips = document.querySelectorAll('.chip');
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (chips.length && serviceCards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        
        const filter = chip.dataset.filter;
        serviceCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? 'block' : 'none';
        });
      });
    });
  }

  // Scroll Reveal Animation
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });
  
  revealItems.forEach(item => observer.observe(item));

  // Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
