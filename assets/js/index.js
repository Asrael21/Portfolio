/*--------------------------------------------------
    Template Name: Mariam - Personal Portfolio Template
--------------------------------------------------*/

    /* -----------------------------------
             Preloader
    ----------------------------------- */
    function loading() {
        "use strict";
        $('.loading').delay(500).fadeOut(500);
    }
    loading()
   /* -----------------------------------
             Switch Mode
    ----------------------------------- */
    const setTheme = (theme) => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
        }

    const getTheme = () => {
        const theme = localStorage.getItem('theme');
        theme && setTheme(theme);
    }
    getTheme();

    /* -----------------------------------
                Menu
    ----------------------------------- */
    function menu() {
        "use strict";
        document.getElementById("buttonToggle").addEventListener("click", function () {
            document.querySelector(".header--left").classList.toggle("header--open");
        });
    
        document.querySelector(".header__nav__cross").addEventListener("click", function () {
            document.querySelector(".header--left").classList.remove("header--open"); 
        });
    
        var navLinks = document.querySelectorAll(".nav__link");
        navLinks.forEach(function (navLink) {
            navLink.addEventListener("click", function () {
                document.querySelector(".header--left").classList.remove("header--open");
            });
        });
    }
    menu()

    /* -----------------------------------
	       magnificPopup
    -----------------------------------*/
    $('.portfolio__items').magnificPopup({
        delegate: '.btn-view',
        type: 'image',
        tLoading: '',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
    });


     /* -----------------------------------
	       Testimonials Sliders
      -----------------------------------*/
    var swiper = new Swiper(".testimonials__swiper", {
        spaceBetween: 24,
        slidesPerView: 3,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          },
      });


    /* -----------------------------------
	       scrollCue
    -----------------------------------*/
      scrollCue.init({
        duration : 300,
        interval : -200,
        percentage : 0.8
      });
    
      /* -----------------------------------
	      Contact Form Handling & Validation
      -----------------------------------*/
      function FormValidation() {
        'use strict';
        var form = document.querySelector('.contact-form');
        if (!form) return;

        var statusAlert = document.getElementById('formAlert');
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

        form.addEventListener('submit', function (event) {
          event.preventDefault();

          if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
          }

          form.classList.add('was-validated');

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span><span> Sending...</span>';
          }

          var formData = new FormData(form);
          var endpoint = form.getAttribute('action') || 'https://api.web3forms.com/submit';

          fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(function (response) {
            if (response.ok) {
              if (statusAlert) {
                statusAlert.className = 'form-status-alert show-success';
                statusAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Thank you! Your message has been sent successfully. Israel will get back to you soon.';
              }
              form.reset();
              form.classList.remove('was-validated');
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .catch(function (error) {
            // Provide friendly fallback with mailto link
            var name = encodeURIComponent(document.getElementById('name') ? document.getElementById('name').value : '');
            var subject = encodeURIComponent(document.getElementById('subject') ? document.getElementById('subject').value : 'Portfolio Inquiry');
            var msg = encodeURIComponent(document.getElementById('msg') ? document.getElementById('msg').value : '');
            var mailtoUrl = 'mailto:israelteshale2023@gmail.com?subject=' + subject + '&body=Hi Israel, my name is ' + name + ':%0D%0A%0D%0A' + msg;

            if (statusAlert) {
              statusAlert.className = 'form-status-alert show-error';
              statusAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Could not send automatically. <a href="' + mailtoUrl + '" class="alert-link text-decoration-underline ms-1">Click here to send directly via your email client.</a>';
            }
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnContent;
            }
          });
        }, false);
      }
      FormValidation();

