document.addEventListener("DOMContentLoaded", function () {

/* =========================
   1. Navbar Scroll Effect
========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
});


/* =========================
   2. Smooth Scroll (Fallback)
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* =========================
   3. Typing Animation
========================= */
const textArray = [
    "Aspiring Data Scientist",
    "Machine Learning Enthusiast",
    "Data Analyst",
    "AI/ML Developer"
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

const typingElement = document.querySelector(".typing-text");

function typeEffect() {
    if (!typingElement) return;

    currentText = textArray[textIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 1000);


/* =========================
   4. Reveal on Scroll
========================= */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach(el => observer.observe(el));


/* =========================
   5. Contact Form (Demo)
========================= */
const form = document.querySelector("#contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = form.querySelector("button");
        const originalText = btn.innerHTML;

        btn.innerHTML = "Sending...";
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = "Message Sent ✔";
            btn.classList.add("btn-success");

            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove("btn-success");
            }, 2000);

        }, 1500);
    });
}


});
