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

  // Sombra sutil en el nav al hacer scroll
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 12) {
      nav.style.boxShadow = "0 1px 0 rgba(42,36,32,0.06)";
    } else {
      nav.style.boxShadow = "none";
    }
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
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
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
