document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const themeToggle = document.getElementById("themeToggle");

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 16);
  });

  // Mobile menu toggle
  hamburger?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // Dark / Light theme toggle
  function syncThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = document.body.classList.contains("dark-theme")
      ? "☀️"
      : "🌙";
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    syncThemeIcon();
  });

  syncThemeIcon();

  // Section scroll reveal animation
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
});
