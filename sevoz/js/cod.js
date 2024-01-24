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

        // MixItUp Shorting
		$(function(){
            $('.shorting').mixItUp();
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
  const imagenPrincipal = document.querySelector(".inicio img");

  // Cambiar la imagen al hacer scroll
  window.addEventListener("scroll", function() {
      const scrollPos = window.scrollY;
      const translateY = scrollPos / 2;

      imagenPrincipal.style.transform = `translateY(-${translateY}px)`;
  });

  // Reiniciar la imagen al dejar de hacer scroll o mover el mouse
  inicio.addEventListener("scroll", function() {
      imagenPrincipal.style.transform = "translate(0, 0)";
  });
});


// Añade este código para agregar un efecto al hacer hover sobre los círculos
const circulos = document.querySelectorAll(".circulo");

circulos.forEach(circulo => {
    circulo.addEventListener("mouseover", function() {
        this.querySelector("img").style.transform = "scale(1.2)";
    });

    circulo.addEventListener("mouseleave", function() {
        this.querySelector("img").style.transform = "scale(1)";
    });
});


// Función para manejar el evento de desplazamiento
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
    // Obtiene la posición absoluta de la sección
    var sectionTop = section.getBoundingClientRect().top + window.scrollY - 100; // Ajusta la posición según tus necesidades

    // Realiza el desplazamiento suavizado hacia la sección
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
  }
}
