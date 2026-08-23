const App = (() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const transitionLayer = document.querySelector('.page-transition');

  let lastScroll = 0;

  /* ==================================
     Header & Scroll Progress
  ================================== */

  function initHeader() {
    if (!header) return;

    const onScroll = () => {
      const y = window.scrollY;

      header.classList.toggle('is-scrolled', y > 24);
      header.classList.toggle(
        'is-hidden',
        y > lastScroll && y > 420 && !document.body.classList.contains('menu-open')
      );

      lastScroll = y;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;

      doc.style.setProperty('--progress', pct.toFixed(2));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==================================
     Mobile Navigation
  ================================== */

  function initMenu() {
    if (!menu || !menuToggle) return;

    const links = [...menu.querySelectorAll('a')];

    const setState = (open) => {
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);

      menuToggle.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));

      if (open) links[0]?.focus();
    };

    menuToggle.addEventListener('click', () => {
      setState(!menu.classList.contains('is-open'));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => setState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setState(false);
    });
  }

  /* ==================================
     Scroll Reveal Animations
  ================================== */

  function initReveal() {
    const items = document.querySelectorAll(
      '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .text-reveal'
    );

    if (!items.length) return;

    if (reducedMotion) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -7% 0px'
      }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ==================================
     Animated Counters
  ================================== */

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    if (!counters.length) return;

    const animate = (el) => {
      const end = Number(el.dataset.counter || 0);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        const value = Math.round(end * eased).toLocaleString();

        el.textContent = `${prefix}${value}${suffix}`;

        if (t < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.55
      }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ==================================
     Parallax Effects
  ================================== */

  function initParallax() {
    if (reducedMotion) return;

    const items = [...document.querySelectorAll('[data-parallax]')];

    if (!items.length) return;

    let raf = null;

    const update = () => {
      const vh = window.innerHeight;

      items.forEach((el) => {
        const rect = el.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > vh) return;

        const speed = Number(el.dataset.parallax || 0.15);
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed;

        el.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });

      raf = null;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!raf) {
          raf = requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ==================================
     Magnetic Button Interaction
  ================================== */

  function initMagnetic() {
    if (
      reducedMotion ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ==================================
     Custom Cursor
  ================================== */

  function initCursor() {
    if (
      !cursor ||
      !cursorDot ||
      reducedMotion ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let dx = cx;
    let dy = cy;

    document.addEventListener('mousemove', (event) => {
      dx = event.clientX;
      dy = event.clientY;

      cursorDot.style.left = `${dx}px`;
      cursorDot.style.top = `${dy}px`;
    });

    const loop = () => {
      cx += (dx - cx) * 0.16;
      cy += (dy - cy) * 0.16;

      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    document
      .querySelectorAll(
        'a, button, input, textarea, select, [data-cursor]'
      )
      .forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('is-active');
        });

        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('is-active');
        });
      });
  }

  /* ==================================
     Page Transition Effects
  ================================== */

  function initPageTransitions() {
    if (!transitionLayer || reducedMotion) return;

    transitionLayer.classList.add('enter');

    setTimeout(() => {
      transitionLayer.classList.remove('enter');
    }, 900);

    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank'
      ) {
        return;
      }

      const url = new URL(link.href, window.location.href);

      if (url.origin !== window.location.origin) return;

      link.addEventListener('click', (event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();

        document.body.classList.add('is-transitioning');
        transitionLayer.classList.add('leave');

        setTimeout(() => {
          window.location.href = link.href;
        }, 580);
      });
    });
  }

  /* ==================================
     Smooth Anchor Navigation
  ================================== */

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href');

        if (!id || id === '#') return;

        const target = document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });
  }

  /* ==================================
     Contact Form Validation
  ================================== */

  function initForm() {
    const form = document.querySelector('[data-contact-form]');

    if (!form) return;

    const status = form.querySelector('.form-status');
    const fields = [...form.querySelectorAll('[data-validate]')];

    const validators = {
      name: (value) =>
        value.trim().length >= 2
          ? ''
          : 'Please enter your full name.',

      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Please enter a valid email address.',

      company: (value) =>
        value.trim().length >= 2
          ? ''
          : 'Please enter your company name.',

      service: (value) =>
        value
          ? ''
          : 'Please select a service.',

      message: (value) =>
        value.trim().length >= 20
          ? ''
          : 'Please provide at least 20 characters.'
    };

    const validateField = (input) => {
      const field = input.closest('.field');
      const error = field.querySelector('.error');
      const type = input.dataset.validate;

      const message = validators[type]
        ? validators[type](input.value)
        : '';

      field.classList.toggle('is-invalid', Boolean(message));

      error.textContent = message;

      input.setAttribute(
        'aria-invalid',
        String(Boolean(message))
      );

      return !message;
    };

    fields.forEach((input) => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      input.addEventListener('input', () => {
        if (
          input
            .closest('.field')
            .classList.contains('is-invalid')
        ) {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const valid = fields
        .map(validateField)
        .every(Boolean);

      if (!valid) {
        status.textContent =
          'Please review the highlighted fields.';

        status.className = 'form-status';

        form
          .querySelector('.is-invalid [data-validate]')
          ?.focus();

        return;
      }

      status.textContent =
        'Thank you. Your inquiry has been prepared successfully.';

      status.className = 'form-status success';

      form.reset();
    });
  }

  /* ==================================
     Dynamic Copyright Year
  ================================== */

  function setYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ==================================
     Application Initialization
  ================================== */

  function init() {
    initHeader();
    initMenu();
    initReveal();
    initCounters();
    initParallax();
    initMagnetic();
    initCursor();
    initPageTransitions();
    initSmoothAnchors();
    initForm();
    setYear();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);