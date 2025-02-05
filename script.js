const colorDisplay = document.querySelector(".color-display_color");
const colorAnswerButtons = document.querySelectorAll(".answer");
const scoreDisplay = document.querySelector(".score");

//Modal Setup
const modal = document.querySelector(".result-modal");
const modalButton = document.querySelector(".continue");
const modalResult = document.querySelector(".result");

const colors = [
  "#FF0000", // Pure Red
  "#00FF00", // Pure Green
  "#0000FF", // Pure Blue
  "#FFFF00", // Pure Yellow
  "#FF00FF", // Pure Magenta
  "#00FFFF", // Pure Cyan
  "#800000", // Maroon
  "#808000", // Olive
  "#008080", // Teal
  "#800080", // Purple
  "#FFA500", // Orange
  "#A52A2A", // Brown
  "#2F4F4F", // Dark Slate Gray
  "#FFD700", // Gold
  "#4B0082", // Indigo
  "#00FA9A", // Medium Spring Green
  "#DC143C", // Crimson
  "#8B4513", // Saddle Brown
  "#FF4500", // Orange-Red
  "#4682B4", // Steel Blue
];

//randomly selected color
let randomColor = colors[Math.floor(Math.random() * colors.length)];

// Initialize score
let quizScore = 0;

//set Random color to the display
window.addEventListener("DOMContentLoaded", () => {
  colorDisplay.style.backgroundColor = randomColor;
});

// Helper Function to open the modal
function openModal() {
  modal.classList.add("show");
}

// Helper Function to close the modal
function closeModal() {
  modal.classList.remove("show");
}

// Helper Function to convert HEX to RGB
const hexToRgb = (hex) => {
  // Remove the "#" if present
  hex = hex.replace(/^#/, "");
  // Convert shorthand notation to full form (e.g., #FFF -> #FFFFFF)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  // Convert to RGB format
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

// Helper function Shuffle the answers array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

//function to get 6 random colors
const getSixRandomColors = () => {
  let randomColors = [randomColor];
  while (randomColors.length < 6) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (!randomColors.includes(randomColor)) {
      randomColors.push(randomColor);
    }
  }
  randomColors = shuffleArray(randomColors);
  // Set the background color of each button
  colorAnswerButtons.forEach((button, index) => {
    button.style.backgroundColor = randomColors[index];
  });
};

//Function initialization the game
getSixRandomColors();

//function to reset the game after correct answer
const resetGameAfterCorrectAnswer = () => {
  randomColor = colors[Math.floor(Math.random() * colors.length)];
  colorDisplay.style.backgroundColor = randomColor;
  getSixRandomColors();
};

// Add event listener to each button
colorAnswerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.style.backgroundColor === hexToRgb(randomColor)) {
      quizScore = quizScore + 1;
      scoreDisplay.textContent = quizScore;
      openModal();
      modalResult.innerHTML = `
        <h2 class="correct">Correct!</h2>
            <p>Well done! You guessed the correct color</p>`;
    } else {
      modalResult.innerHTML = `
        <h2 class="wrong">Wrong Guess!</h2>
          <p>Well done! But You need to try again</p>`;
      openModal();
    }
  });
});

//refresh button to restart the game from score zero
const refreshButton = document.querySelector(".reset");
refreshButton.addEventListener("click", () => {
  quizScore = 0;
  scoreDisplay.textContent = quizScore;
  resetGameAfterCorrectAnswer();
});

// Add event listener to close the modal and reset the game
modalButton.addEventListener("click", () => {
  closeModal();
  resetGameAfterCorrectAnswer();
});
