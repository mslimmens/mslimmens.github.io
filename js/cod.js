//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

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


// codigo form
let scripURL = 'https://script.google.com/macros/s/AKfycbzWIX65tAo1OUdgK_909PwlCtjPwkDeAeOGtw05CwB--NIbS-bn7jbsyrJDLtedPtaY/exec';
let form = document.forms['submit-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scripURL, {
        method: 'POST',
        body: new FormData(form)
    })
    .then((res) => {
        console.log(res);
        if(res.status === 200){
            form.reset();
            alert('Mensaje Enviado Correctamente');
        }
    })
    .catch((error) => {
        console.error('Error', error.message)
    });
});