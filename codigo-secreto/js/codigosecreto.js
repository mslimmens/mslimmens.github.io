
/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/

var input = document.getElementById("input-texto");
var input_msg = document.getElementById("msg");
var button_encriptar = document.getElementById("btn-encriptar");
var button_copiar = document.getElementById("btn-copy");
var button_desencriptar = document.getElementById("btn-desencriptar");
input.focus(); //ingresar valor

button_encriptar.addEventListener("click", function(event){

    event.preventDefault();

    var array = {
        e: "enter",
        i : "imes",
        a : "ai",
        o : "ober",
        u : "ufat"
    };
    
    var string = input.value;
    var array_string = [];
    
    for (var i = 0; i < string.length ; i++){
    
        array_string.push(string[i]);
        
        switch(array_string[i]) {
            case "a":
                array_string[i] = array[array_string[i]];
                break;
            case "e":
                array_string[i] = array[array_string[i]];
                break;
            case "i":
                array_string[i] = array[array_string[i]];
                break;
            case "o":
                array_string[i] = array[array_string[i]];
                break;
            case "u":
                array_string[i] = array[array_string[i]];
                break;
            default:
                array_string[i];
        }
    
    }

    var encriptación_str = array_string.join('');
    input_msg.value = encriptación_str;
                
})

button_copiar.addEventListener("click", function(event){

    var texto = input_msg.value;
    navigator.clipboard.writeText(texto);
    document.getElementById("msg").value = "";

})

button_desencriptar.addEventListener("click", function(event){

    event.preventDefault();
    var palabraEncriptada = "";

    palabraEncriptada=input.value.toLowerCase();

    if (palabraEncriptada.includes(palabraEncriptada, "ai")){
        palabraEncriptada = palabraEncriptada.replace(/ai/g, "a")
    };

    if (palabraEncriptada.includes(palabraEncriptada, "enter")){
        palabraEncriptada = palabraEncriptada.replace(/enter/g, "e")
    };

    if (palabraEncriptada.includes(palabraEncriptada, "imes")){
        palabraEncriptada = palabraEncriptada.replace(/imes/g, "i")
    };

    if (palabraEncriptada.includes(palabraEncriptada, "ober")){
        palabraEncriptada = palabraEncriptada.replace(/ober/g, "o")
    };

    if (palabraEncriptada.includes(palabraEncriptada, "ufat")){
        palabraEncriptada = palabraEncriptada.replace(/ufat/g, "u")
    };

    document.getElementById("input-texto").value = palabraEncriptada;

})