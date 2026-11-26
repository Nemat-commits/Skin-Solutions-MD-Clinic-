/* Skin Solutions MD Clinic — small, dependency-free behaviour layer. */
(function () {
  'use strict';

  var WHATSAPP = '923278749613';
  var PHONE = '+92 327 8749613';

  /* ---- Sticky header state ---------------------------------------------- */
  var header = document.querySelector('.site-header');
  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* ---- Mobile drawer ---------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('site-drawer');

  function setDrawer(open) {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
    });

    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a')) setDrawer(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawer(false);
        toggle.focus();
      }
      if (event.key === 'Tab' && drawer.classList.contains('is-open')) {
        var items = drawer.querySelectorAll('a[href], button');
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    var wide = window.matchMedia('(min-width: 941px)');
    wide.addEventListener('change', function (event) {
      if (event.matches) setDrawer(false);
    });
  }

  /* ---- Live open / closed status (Asia/Karachi) ------------------------- */
  var statusTexts = document.querySelectorAll('[data-status]');
  var statusDots = document.querySelectorAll('[data-status-dot]');
  var HOURS = { 1: [11, 19], 2: [11, 19], 3: [11, 19], 4: [11, 19], 5: [11, 19], 6: [11, 19], 0: null };
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function clinicNow() {
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (part) { map[part.type] = part.value; });
    var day = SHORT.indexOf(map.weekday);
    return { day: day, hour: Number(map.hour), minute: Number(map.minute) };
  }

  function timeLabel(hour) {
    var suffix = hour >= 12 ? 'pm' : 'am';
    var h = hour % 12 === 0 ? 12 : hour % 12;
    return h + suffix;
  }

  function nextOpening(fromDay) {
    for (var i = 0; i <= 7; i++) {
      var day = (fromDay + i) % 7;
      if (HOURS[day]) {
        var prefix = i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAY_NAMES[day];
        return prefix + ' at ' + timeLabel(HOURS[day][0]);
      }
    }
    return 'Monday at 11am';
  }

  function renderStatus() {
    var now = clinicNow();
    var today = HOURS[now.day];
    var open = false;
    var label = '';

    if (today && now.hour >= today[0] && now.hour < today[1]) {
      open = true;
      label = 'Open now · until ' + timeLabel(today[1]);
    } else if (today && now.hour < today[0]) {
      label = 'Opens today at ' + timeLabel(today[0]);
    } else {
      label = 'Closed · opens ' + nextOpening(now.day);
    }

    statusTexts.forEach(function (node) { node.textContent = label; });
    statusDots.forEach(function (dot) { dot.classList.toggle('is-closed', !open); });
  }

  if (statusTexts.length) {
    renderStatus();
    window.setInterval(renderStatus, 60000);
  }

  /* ---- Reveal on scroll ------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      reveals.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---- Booking form → WhatsApp ------------------------------------------ */
  var form = document.querySelector('[data-booking-form]');
  if (form) {
    var feedback = form.querySelector('[data-form-feedback]');

    var showError = function (message, field) {
      feedback.textContent = message;
      feedback.classList.add('is-error');
      if (field) {
        var wrap = field.closest('.field');
        if (wrap) wrap.classList.add('field--invalid');
        field.focus({ preventScroll: false });
      }
    };

    form.addEventListener('input', function (event) {
      var wrap = event.target.closest('.field');
      if (wrap) wrap.classList.remove('field--invalid');
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      feedback.classList.remove('is-error');
      feedback.textContent = '';

      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var phone = String(data.get('phone') || '').trim();
      var concern = String(data.get('concern') || '').trim();
      var when = String(data.get('day') || '').trim();
      var time = String(data.get('time') || '').trim();
      var notes = String(data.get('notes') || '').trim();

      if (name.length < 2) {
        showError('Please add your name so we know who we are replying to.', form.querySelector('[name="name"]'));
        return;
      }
      if (phone.replace(/\D/g, '').length < 10) {
        showError('Please add a phone number with area code, e.g. 0300 1234567.', form.querySelector('[name="phone"]'));
        return;
      }

      var lines = [
        'Appointment request — Skin Solutions MD Clinic',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        'Reason: ' + (concern || 'General consultation'),
        'Preferred day: ' + (when || 'As soon as possible'),
        'Preferred time: ' + (time || 'Any'),
        notes ? 'Notes: ' + notes : ''
      ].filter(Boolean);

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));

      feedback.innerHTML = 'Opening WhatsApp with your request… If it does not open, ' +
        '<a href="' + url + '" target="_blank" rel="noopener">tap here to send it</a> ' +
        'or call <a href="tel:' + PHONE.replace(/\s/g, '') + '">' + PHONE + '</a>.';

      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* ---- Footer year ------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });
})();
