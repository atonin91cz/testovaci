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

// Rotace hero obrázků podle dne
function setHeroImageByDay() {
  const heroSection = document.querySelector(".hero-section");
  const dayOfWeek = new Date().getDay();

  const images = [
    'url("images/vystavba.jpg")',
    'url("images/obr01.jpg")',
    'url("images/cinost.jpg")',
    'url("images/montaz.jpg")',
    'url("images/vystavba.jpg")',
    'url("images/obr01.jpg")',
    'url("images/cinost.jpg")',
  ];

  heroSection.style.backgroundImage = images[dayOfWeek];
}

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

// Zvýraznění aktivní sekce v navigaci
function highlightActiveSection() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop - 100 &&
      window.scrollY < sectionTop + sectionHeight - 100
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Hladké scrollování s OKAMŽITÝM zvýrazněním
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    // Okamžité zvýraznění kliknuté položky
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    this.classList.add("active");

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Zavření mobilního menu po kliknutí
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  });
});

// Efekty pro modální okna
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Přidáme třídu pulse pro animaci
    const modalId = this.getAttribute("data-bs-target");
    const modal = document.querySelector(modalId);

    modal.addEventListener("shown.bs.modal", function () {
      const modalImage = this.querySelector(".modal-image");
      modalImage.classList.add("pulse");

      // Po skončení animace odstraníme třídu
      setTimeout(() => {
        modalImage.classList.remove("pulse");
      }, 2000);
    });
  });
});

// Parallax efekt pro hero sekci
window.addEventListener("scroll", () => {
  const heroSection = document.querySelector(".hero-section");
  const scrollPosition = window.scrollY;
  heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;

  revealSections();
  highlightActiveSection();
});

// Odeslání formuláře
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Animace odeslání
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Odesílám...';
  submitButton.disabled = true;

  setTimeout(() => {
    alert("Děkujeme za vaši zprávu. Brzy vás budeme kontaktovat.");
    this.reset();
    submitButton.innerHTML = "Odeslat";
    submitButton.disabled = false;
  }, 1500);
});

// Inicializace
window.onload = function () {
  typeText();
  revealSections();
  highlightActiveSection();
  setHeroImageByDay();

  // Přidáme hover efekt pro služby
  document.querySelectorAll(".service-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 30px rgba(52, 152, 219, 0.4)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
};
