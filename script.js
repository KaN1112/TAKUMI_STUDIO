const openingDuration = 3000;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const openingScreen = document.querySelector(".opening-screen");
const revealElements = document.querySelectorAll(".work-card, .contact");

function finishOpening() {
  openingScreen.remove();
  document.documentElement.classList.remove("opening-active");
  startReveal();
}

function showElement(element, observer) {
  element.classList.add("is-visible");
  observer.unobserve(element);
}

function startReveal() {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    return;
  }

  document.documentElement.classList.add("motion-ready");
  revealElements.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showElement(entry.target, observer);
      }
    });
  }, {
    threshold: 0.1
  });

  window.requestAnimationFrame(() => {
    revealElements.forEach((element) => observer.observe(element));
  });
}

if (reducedMotion.matches) {
  finishOpening();
} else {
  document.documentElement.classList.add("opening-active");
  window.setTimeout(finishOpening, openingDuration);
}
