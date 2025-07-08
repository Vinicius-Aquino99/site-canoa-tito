document.addEventListener("DOMContentLoaded", function () {
  // Carregamento otimizado
  const lazyImages = document.querySelectorAll(".gallery-img[data-src]");

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add("loaded");
            img.removeAttribute("data-src");
          };
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: "100px" }
  );

  lazyImages.forEach((img) => imageObserver.observe(img));

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.querySelector(".caption");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.dataset.src || this.src;
      caption.textContent = this.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  const sections = document.querySelectorAll(".fade-section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // remove o observer após animar
        }
      });
    },
    {
      threshold: 0.5, // ativa quando 10% da seção aparece
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
