let secretNumber;
let attempts;
let playerName = "";
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Elements
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const playerNameInput = document.getElementById("playerNameInput");
const startButton = document.getElementById("startButton");

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const leaderboardList = document.getElementById("leaderboardList");

const resetButton = document.getElementById("resetButton");
const backButton = document.getElementById("backButton");
const playAgainButton = document.getElementById("playAgainButton");

// Start game
startButton.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Please enter your name to start!");
    return;
  }

  playerName = name;
  startNewGame();

  welcomeScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
});

// Guess check
function checkGuess() {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = "⚠️ Please enter a number between 1 and 100.";
    feedback.className = "error";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Correct, ${playerName}! You guessed it in ${attempts} attempts.`;
    feedback.className = "success";

    leaderboard.push({ name: playerName, attempts });
    leaderboard.sort((a, b) => a.attempts - b.attempts);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    updateLeaderboard();

    // Show Play Again button
    playAgainButton.classList.remove("hidden");

  } else if (guess < secretNumber) {
    feedback.textContent = "📉 Too low! Try again.";
    feedback.className = "error";
  } else {
    feedback.textContent = "📈 Too high! Try again.";
    feedback.className = "error";
  }
}

// Update leaderboard
function updateLeaderboard() {
  leaderboardList.innerHTML = "";
  leaderboard.slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1} – ${entry.name}: ${entry.attempts} attempts`;
    leaderboardList.appendChild(li);
  });
}

// Start/reset new game
function startNewGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  feedback.textContent = "";
  guessInput.value = "";
  playAgainButton.classList.add("hidden"); // Hide Play Again
}

// Reset leaderboard
resetButton.addEventListener("click", () => {
  localStorage.removeItem("leaderboard");
  leaderboard = [];
  updateLeaderboard();
  alert("Leaderboard has been cleared!");
});

// Back to player select
backButton.addEventListener("click", () => {
  gameScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  playerNameInput.value = "";
});

// Play again button
playAgainButton.addEventListener("click", startNewGame);

guessButton.addEventListener("click", checkGuess);
updateLeaderboard();
