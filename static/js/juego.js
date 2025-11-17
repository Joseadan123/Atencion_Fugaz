let ronda = 1;
let errores = 0;
let velocidad = 250;

let secuencia = [];
let numerosObjetivo = {};
let numIzq = null;
let numDer = null;
let esperando = false;

function generarSecuencia() {
    secuencia = [];
    // Nota: Se usa un string de letras sin I, O, Q, S para evitar confusión con números
    const letras = "ABCDEFGHJKLMNPRTUVWXY Z"; 
    const longitud = 10;

    // Crear la secuencia inicial de letras
    for (let i = 0; i < longitud; i++) {
        secuencia.push(letras[Math.floor(Math.random() * letras.length)]);
    }

    const n1 = Math.floor(Math.random() * 9) + 1; // Número izquierdo (Number)
    const n2 = Math.floor(Math.random() * 9) + 1; // Número derecho (Number)

    // Posiciones aleatorias para los números (asegura que no estén al final)
    const p1 = Math.floor(Math.random() * (longitud - 4)) + 1;
    let p2 = p1 + Math.floor(Math.random() * 3) + 2; // p2 está 2 a 4 posiciones después de p1

    secuencia[p1] = n1.toString();
    secuencia[p2] = n2.toString();

    return { n1, n2 }; // Devuelve los números como tipo Number
}

function mostrarSecuencia() {
    let i = 0;
    esperando = false;

    // Limpiar pantalla
    document.getElementById("mensaje").textContent = "";
    document.getElementById("respuesta_izq").textContent = "";
    document.getElementById("respuesta_der").textContent = "";

    function paso() {
        if (i < secuencia.length) {
            document.getElementById("caracter").textContent = secuencia[i];
            i++;
            setTimeout(paso, velocidad);
        } else {
            // Fin de la secuencia, esperar respuesta
            document.getElementById("caracter").textContent = "";
            esperando = true;
            numIzq = null;
            numDer = null;
        }
    }

    paso();
}

document.addEventListener("keydown", function(e) {
    if (!esperando) return;
    // Solo acepta teclas de números del 1 al 9
    if (e.key < "1" || e.key > "9") return;

    if (numIzq === null) {
        // Captura el primer número (izquierdo)
        numIzq = e.key;
        document.getElementById("respuesta_izq").textContent = numIzq;
        return;
    }

    if (numDer === null) {
        // Captura el segundo número (derecho)
        numDer = e.key;
        document.getElementById("respuesta_der").textContent = numDer;
        validarRonda(); // Una vez que tiene ambos, valida
    }
});

function validarRonda() {
    const msg = document.getElementById("mensaje");

    // SOLUCIÓN AL PROBLEMA DE TIPOS: convertimos las entradas a Number para compararlas con n1/n2
    if (parseInt(numIzq) === numerosObjetivo.n1 && parseInt(numDer) === numerosObjetivo.n2) {
        msg.textContent = "Correcto";
    } else {
        errores++;
        msg.textContent = `Incorrecto (Errores: ${errores}/3)`;
    }

    if (errores >= 3) {
        // Redirige a Flask para mostrar la pantalla de perdiste
        setTimeout(() => window.location.href = "/perdiste", 1500);
        return;
    }

    ronda++;
    if (ronda > 5) {
        // Redirige a Flask para mostrar la pantalla de resultado/victoria
        setTimeout(() => window.location.href = "/resultado", 1500);
        return;
    }

    // Aumentar la dificultad: reducir velocidad
    velocidad = Math.max(80, velocidad - 40);

    // Iniciar la siguiente ronda después de una pausa
    setTimeout(() => {
        numerosObjetivo = generarSecuencia();
        mostrarSecuencia();
    }, 2000);
}

// Al presionar el botón iniciar
document.getElementById("btnIniciar").addEventListener("click", () => {
    document.getElementById("btnIniciar").style.display = "none";
    
    // Iniciar la primera ronda
    numerosObjetivo = generarSecuencia();
    mostrarSecuencia();
});