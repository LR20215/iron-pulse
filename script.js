
/* =========================================
   IRON PULSE - INTERACTIONS
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

// MENU MOBILE

menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

});

// FERMETURE DU MENU APRÈS UN CLIC

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// FERMETURE AVEC LA TOUCHE ECHAP

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

    }

});

// NAVIGATION ACTIVE

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    threshold: 0.3
});

sections.forEach(section => observer.observe(section));

// HEADER AU SCROLL

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// VIDEO : PAUSE SI L'UTILISATEUR PRÉFÈRE MOINS D'ANIMATIONS

const heroVideo = document.querySelector(".hero-video");

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.pause();
}

console.log("IRON PULSE : système initialisé.");
