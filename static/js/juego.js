let ronda = 1;
let errores = 0;
let velocidad = 250;

let secuencia = [];
let numerosObjetivo = {};
let numIzq = null;
let numDer = null;
let esperando = false;

// Variables para el temporizador
let tiempoInicioRonda = null;
let tiemposPorRonda = [];

function generarSecuencia() {
    secuencia = [];
    // Nota: Se usa un string de letras sin I, O, Q, S para evitar confusión con números
    const letras = "ABCDEFGHJKLMNPRTUVWXY Z"; 
    // Longitud inicial: 10, aumenta 2 caracteres por ronda
    // Ronda 1: 10, Ronda 2: 12, Ronda 3: 14, ..., Ronda 8: 24
    const longitud = 10 + (ronda - 1) * 2;

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
            // Iniciar el temporizador cuando la secuencia termine
            tiempoInicioRonda = Date.now();
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
        
        // Detener el temporizador inmediatamente cuando ingresa el segundo número
        let tiempoRespuesta = null;
        if (tiempoInicioRonda !== null) {
            tiempoRespuesta = Date.now() - tiempoInicioRonda;
            tiempoInicioRonda = null; // Detener el temporizador
        }
        
        // Desactivar la espera para evitar más inputs
        esperando = false;
        
        // Mostrar las respuestas un momento antes de validar
        setTimeout(() => {
            validarRonda(tiempoRespuesta);
        }, 800); // Mostrar por 800ms antes de pasar a la siguiente ronda
    }
});

function validarRonda(tiempoRespuesta) {
    // Guardar el tiempo de respuesta (ya calculado y pasado como parámetro)
    if (tiempoRespuesta !== null) {
        tiemposPorRonda.push({
            ronda: ronda,
            tiempo: tiempoRespuesta,
            correcto: false
        });
    }

    // SOLUCIÓN AL PROBLEMA DE TIPOS: convertimos las entradas a Number para compararlas con n1/n2
    if (parseInt(numIzq) === numerosObjetivo.n1 && parseInt(numDer) === numerosObjetivo.n2) {
        if (tiempoRespuesta !== null) {
            tiemposPorRonda[tiemposPorRonda.length - 1].correcto = true;
        }
    } else {
        errores++;
    }

    ronda++;
    if (ronda > 8) {
        // Guardar tiempos en sessionStorage antes de redirigir
        sessionStorage.setItem('tiemposPorRonda', JSON.stringify(tiemposPorRonda));
        // Redirige a Flask para mostrar la pantalla de resultado/victoria
        window.location.href = "/resultado";
        return;
    }

    // Aumentar la velocidad (reducir el tiempo entre caracteres)
    velocidad = Math.max(50, velocidad - 30); // Reduce 30ms por ronda, mínimo 50ms

    // Iniciar la siguiente ronda inmediatamente después de mostrar las respuestas
    numerosObjetivo = generarSecuencia();
    mostrarSecuencia();
}

// Al presionar el botón iniciar
document.getElementById("btnIniciar").addEventListener("click", () => {
    document.getElementById("btnIniciar").style.display = "none";
    
    // Iniciar la primera ronda
    numerosObjetivo = generarSecuencia();
    mostrarSecuencia();
});