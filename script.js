/**
 * Chandru Duraikannan — Portfolio
 * Minimal, purposeful JS: nav, scroll reveal, mobile menu
 */

'use strict';

/* ─── Sticky Header: add shadow on scroll ────────────────────────── */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 1px 12px rgba(23, 74, 126, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── Mobile Navigation ───────────────────────────────────────────── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobile-nav');
  const backdrop   = document.getElementById('mobile-nav-backdrop');
  const closeBtn   = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileNav) return;

  const openMenu = () => {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus to close button
    if (closeBtn) closeBtn.focus();
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  };

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Escape key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
})();

/* ─── Scroll Reveal ───────────────────────────────────────────────── */
(function () {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ─── Smooth Anchor Navigation ───────────────────────────────────── */
(function () {
  const headerHeight = 64; // matches CSS header height

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ─── Active Nav Link on Scroll ──────────────────────────────────── */
(function () {
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  if (!navLinks.length) return;

  const sections = ['uiux-design', 'about', 'experience', 'contact'].map(id => {
    return { id, el: document.getElementById(id) };
  }).filter(s => s.el);

  const updateActive = () => {
    const scrollY = window.scrollY + 80;

    let current = '';
    sections.forEach(({ id, el }) => {
      if (el.offsetTop <= scrollY) current = id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.style.color = '';
      if (href === `#${current}`) {
        link.style.color = 'var(--text-dark)';
      }
    });
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
