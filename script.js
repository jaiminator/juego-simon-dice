const colours = ['red', 'blue', 'yellow', 'green']; //Array con los colores disponibles
let gameSequence = [];  //Secuencia generada por el juego
let playerSequence = [];   //Secuencia introducida por el jugador
let numLevel = 0; // Nivel actual
let canPlayerClick = false; //No permite al jugador clickar

//Lista de elementos del DOM
const level = document.getElementById('level');
const message  = document.getElementById('message');
const btnStart  = document.getElementById('start-button');
const btnReset  = document.getElementById('reset-button');
btnReset.style.display = 'none';

const redBox = document.getElementById('red');
const blueBox = document.getElementById('blue');
const yellowBox = document.getElementById('yellow');
const greenBox = document.getElementById('green');

redBox.addEventListener('click', handlePlayerClick);
blueBox.addEventListener('click', handlePlayerClick);
yellowBox.addEventListener('click', handlePlayerClick);
greenBox.addEventListener('click', handlePlayerClick);

function startGame() {
    numLevel = 0;
    gameSequence = [];
    message.textContent = 'EMPEZAMOS...';
    btnStart.disabled = 'true';
    btnReset.disabled = 'true';
    setTimeout(() => {
        nextLevel();
    }, 2000);
}

function nextLevel() {
    numLevel++; //incremento del nivel del juego
    level.textContent = numLevel;   //actualización por pantalla del nº del nivel
    playerSequence = []; //reseteo de la secuencia del jugador
    message.textContent = '';   //mensaje vacío
    canPlayerClick = false; //no permite al jugador clickar

    // mete la combinación de colores aleatorio al array
    
    const colourPosition = Math.floor(Math.random() * colours.length);
    gameSequence.push(colours[colourPosition]);
    /* console.log(gameSequence); */
    
    playSequence()
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
}

/* Función para mostrar la secuencia completa de colores */
async function playSequence() {

    /* console.log('MOSTRANDO SECUENCIA:'); */

    const lightDuration = 1000;
    const pauseDuration = 200;

    for (const color of gameSequence) {
        const colorBox = document.getElementById(color);
        if (colorBox) {
            /* console.log(color); */
            colorBox.classList.add('light');
            await wait(lightDuration);
            colorBox.classList.remove('light');
            await wait(pauseDuration);
        }
    }
    canPlayerClick = true;
    /* console.log('SECUENCIA TERMINADA'); */
    message.textContent = 'TU TURNO!'
}

/* Función para iluminar el botón del elemento clickado */
async function lightButton(colorId) {
    const colorBox = document.getElementById(colorId);
    colorBox.classList.add('light');

    const pauseDuration = 200;
    await wait(pauseDuration);
    colorBox.classList.remove('light');
}

/* Manejo de eventos para el jugador */
function handlePlayerClick(event) {

    if (canPlayerClick == true) {
        const clickBox = event.target.id;   //obtener el id del botón pulsado
        /* console.log(clickBox); */
        lightButton(clickBox);
        playerSequence.push(clickBox);
        /* console.log(playerSequence); */
        checkAnswer(playerSequence.length - 1);
    }
}

async function checkAnswer(currentIndex) {
    
    if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
        gameOver();
    } else if (playerSequence[currentIndex] == gameSequence[currentIndex]){
        if (playerSequence.length === gameSequence.length) {
            canPlayerClick = false;
            message.innerHTML = '<b>NIVEL COMPLETADO!!</b>';
            setTimeout(() => {
                nextLevel();
            }, 2000);
        }
    }
}

function gameOver() {
    canPlayerClick = false;
    message.textContent = `JUEGO TERMINADO. PERDISTE! NIVEL ALCANZADO: ${numLevel}`;
    btnStart.style.display = 'none';
    btnReset.removeAttribute('disabled');
    btnReset.style.display = 'inline-block';
}

/* Eventos iniciales de los botones para jugar o volver a jugar */
btnStart.addEventListener('click', startGame);
btnReset.addEventListener('click', startGame);

