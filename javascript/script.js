document.addEventListener("DOMContentLoaded", () => {
  const timerContainer = document.querySelector(".timer-container");
  if (!timerContainer) return;

  const duration = parseInt(timerContainer.dataset.duration) || 60;
  let timeLeft = duration;
  let timerInterval = null;

  const circle = timerContainer.querySelector(".progress-ring__circle");
  const timeDisplay = timerContainer.querySelector(".time-display");
  const startBtn = timerContainer.querySelector(".startBtn");
  const resetBtn = timerContainer.querySelector(".resetBtn");
  const steakGif = timerContainer.querySelector(".steak-gif");


  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

  function updateCircle() {
    const percent = (duration - timeLeft) / duration;
    const offset = circumference - percent * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function startTimer() {
    if (timerInterval) return;

    steakGif.src = steakGif.dataset.anim;
    timerContainer.classList.add("running");

    timerInterval = setInterval(() => {

      if (timeLeft > 0) {

        if (!flipAlertGiven && timeLeft === Math.floor(duration / 2)) {
          alert("Flip the steak! 🥩🔥");
          flipAlertGiven = true;
        }

        timeLeft--;
        updateTimeDisplay();
        updateCircle();

      } else {
        clearInterval(timerInterval);
        timerInterval = null;

        timeDisplay.textContent = "Done!";
        circle.style.stroke = "#00c853";

        steakGif.src = steakGif.dataset.still;
        timerContainer.classList.remove("running");

        const alarmSound = new Audio("sounds/alarm.mp3");
        alarmSound.play();
      }

    }, 1000);
  }



  function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  flipAlertGiven = false; // 🔔 flip reminder flag
  timeLeft = duration;

  updateTimeDisplay();
  circle.style.strokeDashoffset = circumference;
  circle.style.stroke = "#ff6a00";

  steakGif.src = steakGif.dataset.still; // ⏹ STOP GIF
  timerContainer.classList.remove("running"); // stop pulse
}



  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);

  // Initialize display
  updateTimeDisplay();
});

