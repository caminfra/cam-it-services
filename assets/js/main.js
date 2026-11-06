/* CamGotIT IT Services — site interactions */
(function () {
  'use strict';

  var CONTACT_EMAIL = 'hello@camgotit.com';

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---------- Mobile navigation ----------
  var burger = document.querySelector('.nav-burger');
  var nav = document.getElementById('primary-nav');
  var menuItem = document.querySelector('.has-menu');
  var menuToggle = document.querySelector('.menu-toggle');

  function setNav(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
  var status = document.getElementById('form-status');
  var serviceSelect = document.getElementById('f-service');

  // Clicking a service card pre-selects it in the form
  document.querySelectorAll('.service-card[data-service]').forEach(function (card) {
    card.addEventListener('click', function () {
      if (serviceSelect) serviceSelect.value = card.getAttribute('data-service');
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var required = [name, email, message];
      var firstBad = null;

      required.forEach(function (input) {
        var ok = input.value.trim() !== '' && input.checkValidity();
        input.classList.toggle('invalid', !ok);
        input.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstBad) firstBad = input;
      });

      if (firstBad) {
        status.textContent = firstBad === email && email.value.trim()
          ? 'Please enter a valid email address.'
          : 'Please fill in your name, email, and a short description.';
        status.classList.add('error');
        firstBad.focus();
        return;
      }

      var service = form.elements.service.value || 'General IT help';
      var phone = form.elements.phone.value.trim();
      var subject = 'Quote request: ' + service + ' — ' + name.value.trim();
      var body = [
        'Name: ' + name.value.trim(),
        'Email: ' + email.value.trim(),
        'Phone: ' + (phone || 'Not provided'),
        'Service needed: ' + service,
        '',
        message.value.trim()
      ].join('\n');

      status.classList.remove('error');
      status.textContent = 'Opening your email app… If nothing opens, call or text (769) 208-7034.';
      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('invalid') && e.target.value.trim()) {
        e.target.classList.remove('invalid');
        e.target.removeAttribute('aria-invalid');
      }
    });
  }
})();
