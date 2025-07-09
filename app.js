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

  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const nav = document.querySelector("nav");

  // Função para fechar o menu
  function closeMenu() {
    nav.classList.remove("active");
  }

  menuToggle.addEventListener("click", function (e) {
    // Alterna a classe 'active' para mostrar/ocultar o menu
    e.stopPropagation();
    document.querySelector("nav").classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  const menuLinks = document.querySelectorAll("nav ul a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxScroll = document.querySelector(".lightbox-scroll");
  const caption = document.getElementById("caption");
  const closeBtn = document.getElementById("closeBtn");

  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", function () {
      // Limpa imagens anteriores
      lightboxScroll.innerHTML = "";

      // Adiciona todas as imagens da galeria
      const allImgs = document.querySelectorAll(".gallery-img");
      allImgs.forEach((galleryImg) => {
        const imgEl = document.createElement("img");
        imgEl.src = galleryImg.dataset.src || galleryImg.src;
        imgEl.alt = galleryImg.alt;
        lightboxScroll.appendChild(imgEl);
      });

      // Abre o lightbox
      lightbox.style.display = "flex";

      // Scroll para a imagem clicada
      const index = [...allImgs].indexOf(this);
      const targetImg = lightboxScroll.children[index];
      lightboxScroll.scrollLeft = targetImg.offsetLeft;

      // Atualiza legenda
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

  window.addEventListener("scroll", function () {
    var scrolled = window.scrollY;
    var parallax = document.querySelector("header");
    parallax.style.backgroundPosition = "center " + scrolled * 0.2 + "px";
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
