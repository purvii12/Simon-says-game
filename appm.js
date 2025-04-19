const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let score = 0; // Score variable

const scoreDisplay = document.getElementById("score"); // To display score
const restartButton = document.getElementById("restartButton"); // Restart button

// Start game on any keypress
document.addEventListener("keydown", () => {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Button click handler
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    if (!started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  const button = document.getElementById(randomChosenColor);
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 200);
}

// Animate button press
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

// Check answer and update score
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      score++; // Increase score when a level is passed
      scoreDisplay.textContent = score; // Update score display
      setTimeout(nextSequence, 1000);
    }
  } else {
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    // Show restart button
    restartButton.style.display = "inline-block";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// Start over the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  score = 0; // Reset score
  scoreDisplay.textContent = score; // Update score display
  started = false;

  // Hide the restart button
  restartButton.style.display = "none";
}

// Restart game on button click
restartButton.addEventListener("click", () => {
  startOver();
  nextSequence();
});
