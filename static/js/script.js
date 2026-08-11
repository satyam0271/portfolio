document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("shadow");
        } else {
            navbar.classList.remove("shadow");
        }
    });

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

    const textArray = [
        "Aspiring Data Scientist",
        "AI/ML Enthusiast",
        "Data Analyst"
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

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectItems.forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    const modalEl = document.getElementById("projectModal");

    if (modalEl && window.bootstrap) {
        const modal = new bootstrap.Modal(modalEl);
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalLink = document.getElementById("modalLink");
        const modalCategory = document.getElementById("modalCategory");

        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("click", () => {
                modalImage.src = card.getAttribute("data-image");
                modalImage.alt = card.getAttribute("data-title");
                modalTitle.textContent = card.getAttribute("data-title");
                modalDescription.textContent = card.getAttribute("data-description");
                modalLink.href = card.getAttribute("data-link");
                modalCategory.textContent = card.getAttribute("data-category");
                modal.show();
            });
        });
    }

});