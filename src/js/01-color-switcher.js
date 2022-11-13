const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let setIntervalF;
stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stop() {
   clearInterval(setIntervalF);
   startBtn.disabled = false;
   stopBtn.disabled = true;
}

function start() {
    setIntervalF = setInterval (() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    stopBtn.disabled = false;
    startBtn.disabled = true;
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
    

