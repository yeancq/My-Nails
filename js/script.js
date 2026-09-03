document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico en el footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  const burger = document.getElementById("burger");
  const navMobile = document.getElementById("navMobile");

  if (burger && navMobile) {
    burger.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    navMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Sombra sutil + ocultar/mostrar el nav según la dirección del scroll
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  const HIDE_AFTER = 120; // px antes de empezar a ocultar
  const onScroll = () => {
    const y = window.scrollY;

    nav.style.boxShadow = y > 12 ? "0 1px 0 rgba(42,36,32,0.06)" : "none";

    if (navMobile && navMobile.classList.contains("is-open")) {
      lastY = y;
      return; // no ocultar el nav con el menú móvil abierto
    }

    if (y > lastY && y > HIDE_AFTER) {
      nav.classList.add("nav--hidden"); // bajando: ocultar
    } else if (y < lastY) {
      nav.classList.remove("nav--hidden"); // subiendo: mostrar
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== Animación al hacer scroll =====
  // Añade un pequeño escalonado a los elementos que van en grupo
  // (galería, equipo, reseñas, servicios) para que entren en cascada,
  // igual que las líneas del titular en la carga inicial.
  const stagger = (selector, step = 70, max = 6) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i, max) * step}ms`;
    });
  };
  stagger(".gallery__item", 60, 8);
  stagger(".team-card", 100, 3);
  stagger(".review", 70, 6);
  stagger(".service-group", 90, 4);

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se añade al entrar y se quita al salir, tanto al bajar como
          // al subir, para que la animación se repita cada vez.
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo directamente
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
