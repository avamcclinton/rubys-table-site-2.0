/* ===========================================================
   RUBY'S TABLE — Site JavaScript
   Mobile nav, scroll reveals, footer year, Formspree AJAX submit.
   No build step required — vanilla JS only.
   =========================================================== */
(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Ambient looping videos (hero + inline photo-frame loops):
     slow, cinematic playback; respects reduced-motion ---- */
  ['hero-video', 'contact-loop-video'].forEach(function (id) {
    var vid = document.getElementById(id);
    if (!vid) { return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      vid.pause();
      vid.removeAttribute('autoplay');
      vid.removeAttribute('loop');
    } else {
      vid.playbackRate = 0.75;
    }
  });

  /* ---- Scroll reveal animation ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---- Formspree AJAX submission (Contact page) ---- */
  var form = document.getElementById('inquiry-form');
  if (form) {
    var statusEl = document.getElementById('form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        statusEl.setAttribute('data-state', 'error');
        statusEl.textContent =
          'This form is not connected yet. See the README for instructions on connecting Formspree.';
        statusEl.focus();
        return;
      }

      var data = new FormData(form);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            statusEl.setAttribute('data-state', 'success');
            statusEl.textContent =
              "Thank you! Your inquiry has been sent — Ruby will be in touch soon.";
          } else {
            return response.json().then(function (json) {
              throw new Error(
                json && json.errors
                  ? json.errors.map(function (err) { return err.message; }).join(', ')
                  : 'Something went wrong. Please try again.'
              );
            });
          }
        })
        .catch(function (err) {
          statusEl.setAttribute('data-state', 'error');
          statusEl.textContent =
            err.message || 'Something went wrong. Please try again, or text us directly.';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Inquiry';
          statusEl.setAttribute('tabindex', '-1');
          statusEl.focus();
        });
    });
  }
})();
