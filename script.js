const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backTop = document.querySelector(".back-top");

// ================================
// Mobile Navigation
// ================================

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", open);
});

// Close mobile menu after clicking a navigation link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ================================
// Header + Active Navigation
// ================================

window.addEventListener("scroll", () => {
  // Add background to header when scrolling
  header.classList.toggle("scrolled", window.scrollY > 20);

  // Show/hide back-to-top button
  backTop.classList.toggle("show", window.scrollY > 500);

  // Detect current section
  const sections = document.querySelectorAll("main section[id]");
  let current = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  // Highlight active navigation link
  navItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

// ================================
// Back To Top
// ================================

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ================================
// Scroll Reveal Animation
// ================================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

// Observe all elements with .reveal
document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(
      anchor.getAttribute("href")
    );

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
