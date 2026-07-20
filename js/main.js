/* Nav solidify on scroll, mobile menu toggle, scroll-reveal. */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  if (nav) {
    const SOLID_AT = 40;
    let ticking = false;
    function update() {
      nav.classList.toggle("is-solid", window.scrollY > SOLID_AT);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  const toggle = document.getElementById("nav-toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.style.display === "flex";
      links.style.display = open ? "" : "flex";
      links.style.position = "fixed";
      links.style.inset = "64px 0 auto 0";
      links.style.background = "var(--paper)";
      links.style.flexDirection = "column";
      links.style.padding = "16px 24px";
      links.style.borderBottom = "1px solid var(--hairline)";
    });
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealed = document.querySelectorAll("[data-reveal]");
  if (!reduce && "IntersectionObserver" in window && revealed.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
