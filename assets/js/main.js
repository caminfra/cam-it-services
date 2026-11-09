/* CamGotIT IT Services — site interactions */
(function () {
  'use strict';

  var CONTACT_EMAIL = 'hello@camgotit.com';

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---------- Grand opening offer: remove it once it has ended ----------
  document.querySelectorAll('[data-promo-ends]').forEach(function (el) {
    if (Date.now() >= Date.parse(el.getAttribute('data-promo-ends'))) el.remove();
  });

  // ---------- Mobile navigation ----------
  var header = document.querySelector('.site-header');
  var burger = document.querySelector('.nav-burger');
  var nav = document.getElementById('primary-nav');
  var menuItem = document.querySelector('.has-menu');
  var menuToggle = document.querySelector('.menu-toggle');

  function setNav(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // The launch banner can push the header down, so open the menu just below it
    nav.style.top = open ? header.getBoundingClientRect().bottom + 'px' : '';
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function setMenu(open) {
    if (!menuItem || !menuToggle) return;
    menuItem.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!menuItem.classList.contains('open'));
    });
  }
  // Close menus after choosing a link
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setNav(false); setMenu(false); }
    });
  }
  document.addEventListener('click', function (e) {
    if (menuItem && !menuItem.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      if (nav && nav.classList.contains('open')) { setNav(false); burger.focus(); }
    }
  });
  window.matchMedia('(min-width: 961px)').addEventListener('change', function (mq) {
    if (mq.matches) setNav(false);
  });

  // ---------- Active nav link while scrolling ----------
  var links = {
    top: document.querySelector('.nav-link[href="#top"]'),
    about: document.querySelector('.nav-link[href="#about"]'),
    services: menuToggle,
    contact: document.querySelector('.nav-link[href="#contact"]')
  };
  var sections = [
    ['services', document.getElementById('services')],
    ['about', document.getElementById('about')],
    ['contact', document.getElementById('contact')]
  ];
  function updateActive() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var current = 'top';
    sections.forEach(function (s) {
      if (s[1] && s[1].offsetTop <= y) current = s[0];
    });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = 'contact';
    Object.keys(links).forEach(function (k) {
      if (links[k]) links[k].classList.toggle('is-active', k === current);
    });
  }

  // ---------- Mobile quick-action bar ----------
  var bar = document.querySelector('.mobile-bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  function updateBar() {
    if (!bar || !hero || !contact) return;
    var pastHero = hero.getBoundingClientRect().bottom < 0;
    var atContact = contact.getBoundingClientRect().top < window.innerHeight * 0.8;
    bar.classList.toggle('show', pastHero && !atContact);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updateActive(); updateBar(); ticking = false; });
  }, { passive: true });
  updateActive();
  updateBar();

  // ---------- Reveal on scroll ----------
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Quote form ----------
  var form = document.getElementById('quote-form');
  var serviceSelect = document.getElementById('f-service');
  document.querySelectorAll('.service-card[data-service]').forEach(function (card) {
    card.addEventListener('click', function () {
      if (serviceSelect) serviceSelect.value = card.getAttribute('data-service');
    });
  });
  // City or ZIP is required for in-home visits, to check travel before quoting
  var typeSelect = document.getElementById('f-type');
  var cityInput = document.getElementById('f-city');
  var cityMark = document.getElementById('f-city-mark');
  if (typeSelect && cityInput && cityMark) {
    var syncCity = function () {
      var inHome = typeSelect.value === 'In-Home';
      cityInput.required = inHome;
      cityMark.hidden = !inHome;
    };
    typeSelect.addEventListener('change', syncCity);
    syncCity();
  }

  // Browser-native validation and submission to third-party service.
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); }
    });
  }
})();
