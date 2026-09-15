/* Nav solidify on scroll, mobile menu, scroll-reveal.
   Everything here is progressive enhancement: the page is fully readable
   and navigable with this file blocked. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav solidifies once scrolled off the hero ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var SOLID_AT = 40;
    var ticking = false;
    var update = function () {
      nav.classList.toggle("is-solid", window.scrollY > SOLID_AT);
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after navigating to a section.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    // Leaving the mobile breakpoint must not strand the panel open.
    var mq = window.matchMedia("(min-width: 901px)");
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Scroll reveal ----------
     The hidden state lives behind `.js` (set inline in <head> before first
     paint), so a JS failure leaves everything visible. If the observer is
     unavailable or motion is reduced, reveal everything immediately. */
  var revealed = document.querySelectorAll("[data-reveal]");
  if (!revealed.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(revealed, function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      // Stagger siblings within a group so a grid resolves as a sequence
      // rather than a single slab. Capped so a long list never crawls.
      var group = el.parentElement ? el.parentElement.children : [el];
      var index = Array.prototype.indexOf.call(group, el);
      var delay = Math.min(index, 5) * 50;
      el.style.transitionDelay = delay + "ms";
      el.classList.add("is-in");
      io.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

  Array.prototype.forEach.call(revealed, function (el) { io.observe(el); });

  /* Anything already on-screen at load reveals without waiting for a
     scroll event (covers deep links and short viewports). */
  window.addEventListener("load", function () {
    Array.prototype.forEach.call(revealed, function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-in");
    });
  });
})();
