const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// Add different entrance styles so the page feels like it is unfolding as you scroll.
const revealTargets = [
  [".section-label", "reveal"],
  [".intro-content h2, .intro-content p, .intro-content .text-link", "reveal"],
  [".section-heading h2, .section-heading p", "reveal"],
  [".service-card", "reveal-pop"],
  [".split-art", "reveal-left"],
  [".split-copy > *", "reveal-right"],
  [".team-layout > div:first-child > *", "reveal-left"],
  [".portrait-placeholder", "reveal-pop"],
  [".contact-layout > div:first-child > *", "reveal-left"],
  [".contact-form > *", "reveal-right"]
];

revealTargets.forEach(([selector, className]) => {
  document.querySelectorAll(selector).forEach((el, index) => {
    el.classList.add(className);
    el.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  });
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("revealed");
    obs.unobserve(entry.target);
  });
}, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-pop")
  .forEach(el => observer.observe(el));

// A subtle scroll-linked movement on the large decorative artwork.
const heroArt = document.querySelector(".hero-art");
window.addEventListener("scroll", () => {
  if (!heroArt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const y = Math.min(window.scrollY * 0.08, 35);
  heroArt.style.transform = `translateY(${y}px)`;
}, { passive: true });

// Testimonial carousel
const testimonialCards = [...document.querySelectorAll(".testimonial-card")];
const testimonialDots = document.querySelector(".testimonial-dots");
const prevTestimonial = document.querySelector(".testimonial-prev");
const nextTestimonial = document.querySelector(".testimonial-next");
let testimonialIndex = 0;
let testimonialTimer;

function showTestimonial(index) {
  if (!testimonialCards.length) return;
  testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
  testimonialCards.forEach((card, i) => card.classList.toggle("active", i === testimonialIndex));
  document.querySelectorAll(".testimonial-dot").forEach((dot, i) => dot.classList.toggle("active", i === testimonialIndex));
}
function restartTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => showTestimonial(testimonialIndex + 1), 7000);
}
if (testimonialCards.length && testimonialDots) {
  testimonialCards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    dot.addEventListener("click", () => { showTestimonial(i); restartTestimonialTimer(); });
    testimonialDots.appendChild(dot);
  });
  prevTestimonial?.addEventListener("click", () => { showTestimonial(testimonialIndex - 1); restartTestimonialTimer(); });
  nextTestimonial?.addEventListener("click", () => { showTestimonial(testimonialIndex + 1); restartTestimonialTimer(); });
  showTestimonial(0);
  restartTestimonialTimer();
}

const detailBlocks = document.querySelectorAll(".service-detail-block");
if (detailBlocks.length) {
  detailBlocks.forEach((block, index) => {
    block.classList.add("reveal");
    block.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  });
  detailBlocks.forEach(block => observer.observe(block));
}
