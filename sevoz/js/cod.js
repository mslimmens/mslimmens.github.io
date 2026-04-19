      // <!--nav-->
		$(window).on('scroll',function() {
      if ($(this).scrollTop() > 1000){  
          $('.navbar-sticky').addClass("is-sticky");
      }
      else{
          $('.navbar-sticky').removeClass("is-sticky");
      }
});
$(window).on('scroll',function() {
      if ($(this).scrollTop() > 120){  
          $('.navbar-style-two, .transparent-navbar').addClass("is-sticky");
      }
      else{
          $('.navbar-style-two, .transparent-navbar').removeClass("is-sticky");
      }
  });

  //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (!mybutton) return;
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//

(function($){
	"use strict";
	jQuery(document).on('ready', function () {
		$(function(){
            if (typeof $.fn.mixItUp === "function" && $(".shorting").length) {
                $(".shorting").mixItUp();
            }
        });
      });
}(jQuery));

function hizoClick() {
  var nombre = document.getElementById("name").value;
  var correo = document.getElementById("email").value;
  if (nombre == "" || correo == "") {
      //alert("Debes compeltar ambos campos"); 
  } else {
    toastr.info('Mensaje enviado',{
      "positionClass": "toast-bottom-right"
  });
  }
}

/// buevo para se voz

document.addEventListener("DOMContentLoaded", function() {
  const inicio = document.querySelector(".inicio");
  const imagenPrincipal = inicio ? inicio.querySelector("img") : null;
  if (!inicio || !imagenPrincipal) return;

  window.addEventListener("scroll", function() {
      const scrollPos = window.scrollY;
      const translateY = scrollPos / 2;
      imagenPrincipal.style.transform = `translateY(-${translateY}px)`;
  });

  inicio.addEventListener("scroll", function() {
      imagenPrincipal.style.transform = "translate(0, 0)";
  });
});


// Hover sobre íconos de redes
const circulos = document.querySelectorAll(".redes-sociales .circulo");
circulos.forEach(function (circulo) {
    var img = circulo.querySelector("img");
    if (!img) return;
    circulo.addEventListener("mouseover", function () {
        img.style.transform = "scale(1.2)";
    });
    circulo.addEventListener("mouseleave", function () {
        img.style.transform = "scale(1)";
    });
});


// Función para manejar el evento de desplazamiento
function scrollToSection(sectionId) {
  if (sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  var section = document.getElementById(sectionId);
  if (section) {
    var offset = sectionId === "inicio" ? 0 : 88;
    var sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: Math.max(0, sectionTop),
      behavior: "smooth"
    });
  }
}
