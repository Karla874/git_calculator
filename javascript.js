const pantalla = document.querySelector(".resultado");
const acumulador = document.querySelector(".acumulador");
const limpieza = document.querySelector(".cle");
const subLimpieza = document.querySelector(".ce");
const coma = document.querySelector(".adddec");
const cambiador = document.querySelector(".camb");
const borrar = document.querySelector(".desp");
const numeroBot = document.querySelectorAll(".buts .num");
const sumar = document.querySelector(".sum");
const restar = document.querySelector(".sus");
const multiplicar = document.querySelector(".mul");
const dividir = document.querySelector(".divi");
const igual = document.querySelector(".equal");

let hayComa = false;
let positivo = true;
let operacion = false;
let resultado = 0;
let borrarClic = false;

let acum = "";
let resutaldoReal = 0;

// Limpiar todo
function borrarTodo(){
    pantalla.innerHTML = "0";
    acumulador.innerHTML = "";
    hayComa = false;
    positivo = true;
	operacion = false;
	borrarClic = false;
};
limpieza.onclick = function() { borrarTodo(); };
subLimpieza.onclick = function() { pantalla.innerHTML = "0"; };

//Listeners números
numeroBot.forEach((numero) => {
    numero.onclick = function(){
        if ((numero.innerHTML !== "0" && pantalla.innerHTML == "0")) {
            pantalla.innerHTML = numero.innerHTML;
        } else if ((numero.innerHTML == "0" && pantalla.innerHTML !== "0") || numero.innerHTML !== "0") {
            pantalla.innerHTML += numero.innerHTML;
        }
        //Superado los carácteres
        if(pantalla.innerHTML.length > 14) {
            pantalla.innerHTML = pantalla.innerHTML.substring(0,14);
        }
		//Operación
		if(operacion) {
			pantalla.innerHTML = numero.innerHTML;
			operacion = false;
		}
		//Resultado
		if(borrarClic) {
			pantalla.innerHTML = numero.innerHTML;
			borrarClic = false;
		}
   };
});

//Listener coma
coma.onclick = function(){
    if (!hayComa) {
        pantalla.innerHTML += coma.innerHTML;
        hayComa = true;
    }
};

//Listener cambiador
cambiador.onclick = function(){
    if (pantalla.innerHTML !== "0") {
        if (positivo) {
            pantalla.innerHTML = "-"+pantalla.innerHTML;
            positivo = false;
        } else {
            pantalla.innerHTML = pantalla.innerHTML.replace("-","");
            positivo = true;
        }
    }
};

//Listener borrador
borrar.onclick = function(){
    if (pantalla.innerHTML.slice(-1) == ",") {
        hayComa = false;
    }
    pantalla.innerHTML = pantalla.innerHTML.slice(0, -1);
    if (pantalla.innerHTML == "") {
        pantalla.innerHTML = "0";
    }
};

function operar() { operacion = true; hayComa = false; }

//Listener sumar
sumar.onclick = function(){
	acumulador.innerHTML = pantalla.innerHTML + "+";
	operar();
};

//Listener sustraer
restar.onclick = function(){
	acumulador.innerHTML = pantalla.innerHTML + "-";
	operar();
};

//Listener multiplicar
multiplicar.onclick = function(){
	acumulador.innerHTML = pantalla.innerHTML + "x";
	operar();
};

//Listener dividir
dividir.onclick = function(){
	acumulador.innerHTML = pantalla.innerHTML + "÷";
	operar();
};

//Listener resultado
igual.onclick = function(){
	resultado = 0;
	if (acumulador.innerHTML.includes("+")) {
		resultado = parseFloat(acumulador.innerHTML) + parseFloat(pantalla.innerHTML);
	} else if (acumulador.innerHTML.includes("-")) {
		resultado = parseFloat(acumulador.innerHTML) - parseFloat(pantalla.innerHTML);
	} else if (acumulador.innerHTML.includes("x")) {
		resultado = parseFloat(acumulador.innerHTML) * parseFloat(pantalla.innerHTML);
	} else if (acumulador.innerHTML.includes("÷")) {
		resultado = parseFloat(acumulador.innerHTML) / parseFloat(pantalla.innerHTML);
	}
	acumulador.innerHTML += pantalla.innerHTML + "=";
	borrarTodo();
	pantalla.innerHTML = resultado;
	//Superado los carácteres
        if(pantalla.innerHTML.length > 14) {
            pantalla.innerHTML = pantalla.innerHTML.substring(0,14);
        }
	
	borrarClic = true;
};