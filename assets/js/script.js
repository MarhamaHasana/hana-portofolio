'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectCount = document.querySelector('.project-count');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuToggle.innerHTML = isOpen
        ? '<ion-icon name="close-outline"></ion-icon>'
        : '<ion-icon name="menu-outline"></ion-icon>';
    });
  }

  // Close mobile navigation after selecting a section
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      if (menuToggle) {
        menuToggle.setAttribute('aria-label', 'Open navigation');
        menuToggle.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
      }
    });
  });

  // Project category filter
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      let visible = 0;

      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      projectCards.forEach((card) => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });

      if (projectCount) projectCount.textContent = `Showing ${visible} project${visible === 1 ? '' : 's'}`;
    });
  });

  // Active navigation link while scrolling
  const sections = document.querySelectorAll('main section[id]');
  const updateActiveLink = () => {
    let current = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
    backToTop?.classList.toggle('visible', window.scrollY > 450);
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
});
