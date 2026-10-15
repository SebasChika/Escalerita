let contenedor = document.getElementById("contenedor");
let sumaDet = 0;
let cantidadSuma = 0;
let cantidadResta = 101;
let theme = document.getElementById("theme");
theme.volume = 0.4;
let arraySum = [[], [], [], [], [], [], [], [], [], []];
let arrayRes = [[], [], [], [], [], [], [], [], [], []];
let cuadroTotal = [[]];
let este = document.getElementById("este");
let containerDado = document.getElementById("dado");
let dado = document.getElementById("dadito");
dado.addEventListener("click", girar);
let numDado;
let negro = document.getElementById("negro");
let girarr = document.getElementById("girar");
let mover = document.getElementById("mover");
let sumador = 0;
let pantallaInicio = document.getElementById("pantallaInicio");
let botonEmpezar = document.getElementById("botonEmpezar");
botonEmpezar.addEventListener("click", quitarPantalla);
let preguntaPantalla = document.getElementById("preguntaPantalla");
let esoo = document.getElementById("esoo");
let ORDENDECAMINAR = [
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    70, 69, 68, 67, 66, 65, 64, 63, 62, 61,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    10, 9, 8, 7, 6, 5, 4, 3, 2, 1
];
let preguntas = [
    "¿2+5?",
    "¿8*7?",
    "¿100/4?",
    "¿15-9?",
    "¿√64?",
    "¿6*8?",
    "¿9*9?",
    "¿125/5?",
    "¿12*12?",
    "¿45+28?",
    "¿3³?",
    "¿90/3?",
    "¿144/12?",
    "¿25+37?",
    "¿15²?"
];
let respuestas = [
    7,
    56,
    25,
    6,
    8,
    48,
    81,
    25,
    144,
    73,
    27,
    30,
    12,
    62,
    225
];
let posicionFoca = 0;
let movimientosPosibles = 0;
let cantidad = document.getElementById("cantidad");
let quitar = 0;
let puedeMover = false;
let numCasillaRan;
let casillasTram = [];
let respuestaQuiz = document.getElementById("answe");
let enviarRespu = document.getElementById("enviarRespu");
enviarRespu.addEventListener("click", respuestaEncu);
let preguntaHTML = document.getElementById("pregunta");
let preguntaSeleccionada;
let preguntaHacer = true;
let incorrecto = document.getElementById("incorrecto");
let pantallaGanadora = document.getElementById("pantallaGanadora");
let winner = document.getElementById("winner");

function respuestaEncu() {
    let respu = respuestaQuiz.value;
    if (respu == respuestas[preguntaSeleccionada]) {
        preguntaPantalla.classList.remove("question");
        preguntaPantalla.classList.add("questionSalir");
        negro.classList.remove("media");
        negro.classList.add("volverMedia");
        dado.style.pointerEvents = "all";
        esoo.play();
        preguntaHTML.innerHTML = "";
    }
    else {
        incorrecto.play();
        preguntaPantalla.style.filter = "hue-rotate(240deg)";
        setTimeout(() => {
            preguntaPantalla.style.filter = "hue-rotate(0deg)";
        }, 1000);
    }
}

function quitarPantalla() {
    pantallaInicio.style.opacity = "0";
    pantallaInicio.style.pointerEvents = "none";
    theme.play();
    contenedor.classList.add("apareciendo");
    containerDado.classList.add("aparecerDado");
    cantidad.classList.add("aparecerDado2");
    casillasPregunta();
}

function girar() {
    numDado = Math.floor(Math.random() * 6) + 1;
    quitar = numDado;
    movimientosPosibles = numDado;
    girarr.play();

    dado.src = "imagenes/dados/dadoGirando.gif";
    dado.classList.remove("oscurecer", "volver");
    void dado.offsetWidth;
    dado.classList.add("oscurecer");
    setTimeout(() => {
        dado.classList.remove("oscurecer");
        void dado.offsetWidth;
        dado.classList.add("volver");
        dado.src = "imagenes/dados/dados" + (numDado - 1) + ".png"
        cantidad.innerHTML = "CANTIDAD DE MOVIMIENTOS: \n <br> <h2 id='movidas'>" + movimientosPosibles + "</h2>";
        document.getElementById("movidas").classList.remove("aparecerCanti");
        void document.getElementById("movidas").offsetWidth;
        document.getElementById("movidas").classList.add("aparecerCanti");
        este.play();
        setTimeout(() => {
            preguntaHacer = true;
            puedeMover = true;
        }, 200);
    }, 1000);
    console.log("hola");
}

function caminar(e) {
    if (!puedeMover) return;
    let tecla = e.code;
    if (tecla == "Space") {
        if (movimientosPosibles > 0) {
            movimientosPosibles--;
            posicionFoca++;
            mover.play();
            cantidad.innerHTML = "CANTIDAD DE MOVIMIENTOS: \n <br> <h2 id='movidas'>" + movimientosPosibles + "</h2>";
            document.getElementById("movidas").classList.remove("aparecerCanti");
            void document.getElementById("movidas").offsetWidth;
            document.getElementById("movidas").classList.add("aparecerCanti");
            if (ORDENDECAMINAR[posicionFoca] == 1) {
                pantallaGanadora.classList.add("spawn");
                theme.pause();
                winner.play();
            }
            if (posicionFoca > 10 && posicionFoca < 20 || posicionFoca > 30 && posicionFoca < 40 || posicionFoca > 50 && posicionFoca < 60 || posicionFoca > 70 && posicionFoca < 80 || posicionFoca > 90 && posicionFoca < 100) {
                document.getElementById("foca")?.remove();
                document.getElementById("cubo" + ORDENDECAMINAR[posicionFoca]).innerHTML +=
                    "<img id='foca' src='imagenes/sealWalking.gif'>";
                document.getElementById("cubo" + ORDENDECAMINAR[posicionFoca]).style.filter = "brightness(1.2)";
                document.getElementById("foca").classList.add("focaInvertida");
                console.log(posicionFoca);

            }

            else {
                document.getElementById("foca")?.remove();
                document.getElementById("cubo" + ORDENDECAMINAR[posicionFoca]).innerHTML +=
                    "<img id='foca' src='imagenes/sealWalking.gif'>";
                document.getElementById("cubo" + ORDENDECAMINAR[posicionFoca]).style.filter = "brightness(1.2)";
                console.log(posicionFoca);
            }
        }
        else {
            puedeMover = false;
        }
        if (movimientosPosibles == 0) {
            if (!preguntaHacer) return;
            for (let i = 0; i <= 10; i++) {
                if (ORDENDECAMINAR[posicionFoca] == casillasTram[i]) {
                    console.log("estas frito");
                    preguntaHacer = false;
                    preguntaPantalla.classList.add("question");
                    negro.classList.remove("fadeIn")
                    negro.classList.add("media");
                    dado.style.pointerEvents = "none";
                    preguntaSeleccionada = Math.floor(Math.random() * 14) + 1;
                    preguntaHTML.innerHTML += preguntas[preguntaSeleccionada];

                }
            }
        }
    }
}

function casillasPregunta() {
    for (let i = 0; i <= 10; i++) {
        numCasillaRan = Math.floor(Math.random() * 98) + 2;
        casillasTram[i] = numCasillaRan;
        document.getElementById("cubo" + numCasillaRan).style.backgroundColor = "rgb(126, 146, 172)";
    }
    console.log("casillas" + casillasTram);

}


function iniciar() {
    negro.classList.add("fadeIn")
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            sumaDet++;
            cantidadSuma++;
            if (sumaDet != 20 && sumaDet < 11) {
                arraySum[i][j] = cantidadSuma;
            }
            else if (sumaDet === 20) {
                sumaDet = 0;
            }
        }
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            sumaDet++;
            cantidadResta--;
            if (sumaDet != 20 && sumaDet < 11) {
                arrayRes[i][j] = cantidadResta;
            }
            else if (sumaDet === 20) {
                sumaDet = 0;
            }
        }
    }

    cuadroTotal[0] = arrayRes[0];
    cuadroTotal[1] = arraySum[8];
    cuadroTotal[2] = arrayRes[2];
    cuadroTotal[3] = arraySum[6];
    cuadroTotal[4] = arrayRes[4];
    cuadroTotal[5] = arraySum[4];
    cuadroTotal[6] = arrayRes[6];
    cuadroTotal[7] = arraySum[2];
    cuadroTotal[8] = arrayRes[8];
    cuadroTotal[9] = arraySum[0];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            sumador++;
            contenedor.innerHTML += "<div id=cubo" + sumador + " class='cubo'>" + cuadroTotal[i][j]; +"</div>"
        }
    }

    console.log(cuadroTotal);
    console.log(arrayRes);
    let numero = 91;

    document.getElementById("cubo" + numero).innerHTML +=
        "<img id='foca' src='imagenes/sealWalking.gif'>";


}

window.addEventListener("load", iniciar);
window.addEventListener("keydown", caminar);