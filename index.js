document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const navCollapse = document.querySelector(".navbar-collapse");

  // Zavření navigace po kliknutí na odkaz (v mobilní verzi)
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      if (navCollapse.classList.contains("show")) {
        navCollapse.classList.remove("show");
      }
    });
  });

  // Aktualizace aktivní sekce při scrollování
  function changeActiveSection() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveSection);
  changeActiveSection();
});
