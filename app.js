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

  function isMobile() {
    return window.matchMedia("(max-width: 576px)").matches;
  }

  document.querySelectorAll(".gallery-img").forEach((img, index) => {
  img.addEventListener("click", function () {
    lightboxScroll.innerHTML = "";

    if (isMobile()) {
      // Versão Mobile: mostrar todas as imagens lado a lado (com scroll)
      const allImgs = document.querySelectorAll(".gallery-img");
      allImgs.forEach((galleryImg) => {
        const imgEl = document.createElement("img");
        imgEl.src = galleryImg.dataset.src || galleryImg.src;
        imgEl.alt = galleryImg.alt;
        lightboxScroll.appendChild(imgEl);
      });

      // Scroll para a imagem clicada
      const targetImg = lightboxScroll.children[index];
      lightboxScroll.scrollLeft = targetImg.offsetLeft;

      // Adiciona classe para scroll horizontal (opcional)
      lightboxScroll.classList.add("lightbox-scroll");

    } else {
      // Versão Desktop: mostrar só a imagem clicada
      const imgEl = document.createElement("img");
      imgEl.src = img.dataset.src || img.src;
      imgEl.alt = img.alt;
      lightboxScroll.appendChild(imgEl);

      // Remove classe scroll se existir
      lightboxScroll.classList.remove("lightbox-scroll");
    }

    lightbox.style.display = "flex";
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
