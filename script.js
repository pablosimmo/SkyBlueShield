document.addEventListener('DOMContentLoaded', function () {
  // Set current year
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Hero carousel logic with auto-rotate
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero-carousel-dot'));
  var prev = document.querySelector('.hero-carousel-prev');
  var next = document.querySelector('.hero-carousel-next');
  var carousel = document.querySelector('.hero-carousel');

  if (!slides.length || !dots.length || !prev || !next || !carousel) return;

  var current = 0;
  var intervalTime = 6000; // 6 seconds
  var autoRotate;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle('is-active', i === current);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotate = setInterval(nextSlide, intervalTime);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      clearInterval(autoRotate);
      autoRotate = null;
    }
  }

  prev.addEventListener('click', function () {
    showSlide(current - 1);
    startAutoRotate();
  });

  next.addEventListener('click', function () {
    showSlide(current + 1);
    startAutoRotate();
  });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      showSlide(i);
      startAutoRotate();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);


  // Mobile navigation toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('header nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Smooth scroll and close menu when a navigation link is clicked (mobile/tablet + desktop)
    var navLinks = mainNav.querySelectorAll('a[href^="#"]');
    var headerEl = document.querySelector('header');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          var targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            var headerHeight = headerEl ? headerEl.offsetHeight : 0;
            var targetPos = targetEl.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);

            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });
          }
        }
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Start rotation on load
  startAutoRotate();
});


// BACK TO TOP BUTTON
var backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
