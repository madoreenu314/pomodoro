console.log("script.js loaded!");
const alarm = new Audio("alarm.mp3");
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");

let intervalId = null;
let timeLeft = 1500; //25mins

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerEl.innerHTML = formattedTime;
}

function startTimer(){
    if (intervalId !== null) return; // ★ 連打防止
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0){
            alarm.play();
            alert("time's up");
            resetTimer();
        }
    }, 1000);
}
function stopTimer(){
    clearInterval(interval);
}
function resetTimer(){
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}
startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);