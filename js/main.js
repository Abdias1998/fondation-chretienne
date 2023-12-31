(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow");
      } else {
        $(".fixed-top").removeClass("bg-dark shadow");
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow").css("top", -45);
      } else {
        $(".fixed-top").removeClass("bg-dark shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Causes progress
  $(".causes-progress").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    center: true,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });
})(jQuery);

// Fonction pour vérifier s'il est lundi entre 22h30 et minuit et gérer l'icône
function checkAndHandleIcon() {
  const now = new Date();
  const liveIcon = document.getElementById("live-icon");

  if (now.getDay()) {
    // C'est un lundi entre 22h30 et minuit, afficher l'icône
    liveIcon.style.display = "block";
    document.getElementById("live-icon").classList.add("blinking");
  } else {
    // Sinon, cacher l'icône
    liveIcon.style.display = "none";
    document.getElementById("live-icon").classList.remove("blinking");
  }
}

// Appeler la fonction de vérification toutes les minutes
setInterval(checkAndHandleIcon, 60000);

// Appeler la fonction initiale
checkAndHandleIcon();

// Récupérer les éléments du DOM
const openModalBtn = document.getElementById("openModalBtn");
const videoModal = document.getElementById("videoModal");
const closeBtn = document.querySelector(".close");
const youtubeVideo = document.getElementById("youtubeVideo");

// Fonction pour ouvrir la fenêtre modale
function openModal() {
  videoModal.style.display = "block";
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
  videoModal.style.display = "none";
  // Arrêter la vidéo YouTube lorsque la fenêtre modale est fermée
  youtubeVideo.src = youtubeVideo.src;
}

// Écouter les événements de clic
openModalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target == videoModal) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementById("close-btn");

  modal.style.display = "block";
  window.addEventListener("scroll", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
