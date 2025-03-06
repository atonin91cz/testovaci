// Efekt vypisování textu
const text = "Váš technický partner v energetice";
const typedTextElement = document.getElementById("typed-text");
const cursorElement = document.getElementById("cursor");

let index = 0;

function typeText() {
  if (index < text.length) {
    typedTextElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  } else {
    if (cursorElement) {
      cursorElement.remove(); 
    }
    typedTextElement.classList.add("done"); 
  }
}

window.onload = function () {
  typeText();
};

// Efekt přechodů mezi sekcemi
function revealSections() {
  let sections = document.querySelectorAll("section");
  let windowHeight = window.innerHeight;

  sections.forEach((section) => {
    let position = section.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      section.classList.add("visible");
    }
  });
}

// Zavření hamburger menu 
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });
});

// Aktivní sekce v navigaci
function highlightActiveSection() {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  sections.forEach((section, index) => {
    let position = section.getBoundingClientRect().top;
    if (
      position < window.innerHeight / 2 &&
      position > -window.innerHeight / 2
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  revealSections();
  highlightActiveSection();
});
revealSections();

// Parallax efekt pro hero sekci
window.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero-section");
  const scrollPosition = window.scrollY;
  heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});
