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
        const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ";
        const longitud = 6;

        for (let i = 0; i < longitud; i++) {
            secuencia.push(letras[Math.floor(Math.random() * letras.length)]);
        }

        const n1 = Math.floor(Math.random() * 9) + 1;
        const n2 = Math.floor(Math.random() * 9) + 1;

        const p1 = Math.floor(Math.random() * longitud);
        let p2 = Math.floor(Math.random() * longitud);
        while (p2 === p1) p2 = Math.floor(Math.random() * longitud);

        secuencia[p1] = n1.toString();
        secuencia[p2] = n2.toString();

        return { n1, n2 };
    }

    function mostrarSecuencia() {
        let i = 0;
        esperando = false;

        document.getElementById("mensaje").textContent = "";
        document.getElementById("respuesta_izq").textContent = "";
        document.getElementById("respuesta_der").textContent = "";

        function paso() {
            if (i < secuencia.length) {
                document.getElementById("caracter").textContent = secuencia[i];
                i++;
                setTimeout(paso, velocidad);
            } else {
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
        if (e.key < "1" || e.key > "9") return;

        if (numIzq === null) {
            numIzq = e.key;
            document.getElementById("respuesta_izq").textContent = numIzq;
            return;
        }

        if (numDer === null) {
            numDer = e.key;
            document.getElementById("respuesta_der").textContent = numDer;
            validarRonda();
        }
    });

    function validarRonda() {
        const msg = document.getElementById("mensaje");

        if (numIzq == numerosObjetivo.n1 && numDer == numerosObjetivo.n2) {
            msg.textContent = "Correcto";
        } else {
            errores++;
            msg.textContent = `Incorrecto (errores: ${errores}/3 )`;
        }

        if (errores >= 3) {
            setTimeout(() => window.location.href = "/perdiste", 1500);
            return;
        }

        ronda++;
        if (ronda > 5) {
            setTimeout(() => window.location.href = "/resultado", 1500);
            return;
        }

        velocidad = Math.max(80, velocidad - 40);

        setTimeout(() => {
            numerosObjetivo = generarSecuencia();
            mostrarSecuencia();
        }, 2000);
    }

    // Al presionar el botón iniciar
    document.getElementById("btnIniciar").addEventListener("click", () => {
        document.getElementById("btnIniciar").style.display = "none";

        numerosObjetivo = generarSecuencia();
        mostrarSecuencia();
    });