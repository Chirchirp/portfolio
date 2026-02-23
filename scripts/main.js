/* main.js — Pharaoh Chirchir Portfolio
   Progressive enhancement only. No frameworks.
   Features: nav toggle, active link, scroll animations, contact form
*/

(function () {
  'use strict';

  /* ===== MOBILE NAV ===== */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-link') : [];

  function openMobileNav() {
    mobileNav.hidden = false;
    hamburger.setAttribute('aria-expanded', 'true');
    mobileClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', openMobileNav);
    mobileClose.addEventListener('click', closeMobileNav);

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !mobileNav.hidden) closeMobileNav();
    });
  }

  /* ===== ACTIVE NAV LINKS ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ===== CONTACT FORM ===== */
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit');
  const successMsg = document.getElementById('form-success');

  // Simple validators
  const validators = {
    name: v => v.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    message: v => v.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters).',
  };

  function showError(fieldId, msg) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (!input || !errorEl) return;
    errorEl.textContent = msg;
    input.classList.toggle('error', msg !== '');
    input.setAttribute('aria-invalid', msg !== '' ? 'true' : 'false');
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input || !validators[fieldId]) return true;
    const error = validators[fieldId](input.value);
    showError(fieldId, error);
    return error === '';
  }

  // Live validation on blur
  if (form) {
    ['name', 'email', 'message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.addEventListener('blur', () => validateField(id));
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Honeypot check
      const honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) return; // Bot detected — silently drop

      // Validate all fields
      const valid = ['name', 'email', 'message'].map(validateField).every(Boolean);
      if (!valid) {
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // UI: loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      submitBtn.disabled = true;
      btnText.hidden = true;
      btnLoading.hidden = false;

      try {
        /* -------------------------------------------------------
           FORMSPREE INTEGRATION:
           1. Sign up at formspree.io
           2. Create a form and get your form ID
           3. Replace the fetch URL below:
              'https://formspree.io/f/YOUR_FORM_ID'
           4. Remove the setTimeout simulation below
        ------------------------------------------------------- */
        const formData = new FormData(form);

        /* -- SIMULATION (remove when using Formspree) -- */
        await new Promise(resolve => setTimeout(resolve, 900));
        /* -- END SIMULATION -- */

        /* -- REAL FORMSPREE CALL (uncomment when ready):
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Network error');
        -- */

        // Success
        form.reset();
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (err) {
        alert('Failed to send your message. Please email directly: chirkiruiphero@gmail.com');
      } finally {
        submitBtn.disabled = false;
        btnText.hidden = false;
        btnLoading.hidden = true;
      }
    });
  }

  /* ===== HEADER SHADOW ON SCROLL ===== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 1px 16px rgba(0,0,0,0.08)'
        : 'none';
    }, { passive: true });
  }

})();
