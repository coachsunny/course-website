// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Navbar Scroll Effect & Section Observer
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Scroll background change
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     Mobile Navigation Toggle
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ==========================================================================
     Copy Email to Clipboard
     ========================================================================== */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const contactEmail = document.getElementById('contact-email');

  if (btnCopyEmail && contactEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const emailText = contactEmail.textContent.trim();
      navigator.clipboard.writeText(emailText).then(() => {
        const originalIcon = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = '<i class="fas fa-check" style="color: #34d399;"></i>';
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalIcon;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  }

  /* ==========================================================================
     Contact Form Handler
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.className = 'form-status success';
        formStatus.textContent = '🎉 訊息發送成功！感謝您的聯繫。';
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }, 1200);
    });
  }

  /* ==========================================================================
     Intersection Observer for Fade-in Animations
     ========================================================================== */
  const animateOnScrollElements = document.querySelectorAll('.glass-card, .timeline-item, .hero-content, .hero-avatar-wrapper');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateOnScrollElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollObserver.observe(el);
  });

  /* ==========================================================================
     Auto-update Footer Year
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
