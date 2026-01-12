const alarm = new Audio("alarm.mp3");

const workBtn = document.getElementById("work");
const breakBtn = document.getElementById("break");
const pauseBtn = document.getElementById("pause");
const timerEl = document.getElementById("timer");


const State = {
  IDLE: "idle",
  WORK: "work",
  BREAK: "break",
};

let intervalId = null;
let timeLeft = 25 * 60;
let currentState = State.IDLE;
let paused = false;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      alarm.currentTime = 0;
      alarm.play();
      alarm.onended = () => {
        alert("time's up");
      };
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function startWork() {
  stopTimer();
  currentState = State.WORK;
  timeLeft = 25 * 60;
  updateTimer();
  startTimer();
}

function startBreak() {
  stopTimer();
  currentState = State.BREAK;
  timeLeft = 5 * 60;
  updateTimer();
  startTimer();
}

function togglePause() {
  if (!intervalId && !paused) return;

  if (!paused) { //止まってないなら止める
    stopTimer();
    paused = true;
    pauseBtn.textContent = "Resume";
  } else {
    startTimer();
    paused = false;
    pauseBtn.textContent = "Pause";
  }
}

workBtn.addEventListener("click", startWork);
breakBtn.addEventListener("click", startBreak);
pauseBtn.addEventListener("click", togglePause);

updateTimer();
