const clickSound = new Audio("sounds/click.wav");
const winSound = new Audio("sounds/win.wav");
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");
const playAgainSound = new Audio("sounds/playAgain.wav");
const resetGameSound = new Audio("sounds/reset.wav");

let playerScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];
const playerChoices = document.querySelectorAll(".choice");
const resultModal = document.getElementById("result-modal");
const resultTextElement = document.getElementById("result-text");

playerChoices.forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
        let result;
        let randomIndex = Math.floor(Math.random() * 3);
        const playerChoice = button.dataset.choice;
        const computerChoice = choices[randomIndex];
        
        if(playerChoice === computerChoice) {
            result = "It's a Tie";
        }
        else {
            switch(playerChoice) {
                case "rock":
                    result = computerChoice === "scissors" ? "You Win!" : "You Lose!";
                break;
                case "paper":
                    result = computerChoice === "rock" ? "You Win!" : "You Lose!";
                break;
                case "scissors": 
                    result = computerChoice === "paper" ? "You Win!" : "You Lose!";
                break;
            }
            if (result === "You Win!") {
                playerScore++;
            } else if (result === "You Lose!") {
                computerScore++;
            }
        }

        setTimeout(() => {
            resultModal.classList.remove("hidden");

            const playerSelectionImage = document.getElementById("player-selection-img");
            const playerSelectionLabel = document.getElementById("player-selection-label");
            const computerSelectionImage = document.getElementById("computer-selection-img");
            const computerSelectionLabel = document.getElementById("computer-selection-label");
            playerSelectionImage.src = `./images/${playerChoice}.png`;
            computerSelectionImage.src = `./images/${computerChoice}.png`;
            playerSelectionLabel.textContent = playerChoice[0].toUpperCase() + playerChoice.slice(1);
            computerSelectionLabel.textContent = computerChoice[0].toUpperCase() + computerChoice.slice(1);

            playerSelectionImage.parentElement.classList.remove("animate");
            computerSelectionImage.parentElement.classList.remove("animate");

            void playerSelectionImage.parentElement.offsetWidth;

            playerSelectionImage.parentElement.classList.add("animate");
            computerSelectionImage.parentElement.classList.add("animate");
            
            document.getElementById("result-text").textContent = result;
            document.getElementById("player-score").textContent = playerScore;
            document.getElementById("computer-score").textContent = computerScore;

            resultTextElement.classList.remove("animate");
            void resultTextElement.offsetWidth;
            resultTextElement.classList.add("animate");

            if (result === "You Win!") {
                resultTextElement.style.color = "#00ff88";
                winSound.currentTime = 0;
                winSound.play();
            } else if (result === "You Lose!") {
                resultTextElement.style.color = "#ff4757"; 
                loseSound.currentTime = 0;
                loseSound.play();
            } else {
                resultTextElement.style.color = "#ffa502";
                drawSound.currentTime = 0;
                drawSound.play();
            } 
        },300);
    })
});

const playAgainBtn = document.getElementById("close-modal");
playAgainBtn.addEventListener('click', () => {
    resultModal.classList.add("hidden");
    playAgainSound.currentTime = 0;
    playAgainSound.play();
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener('click', () => {
    document.getElementById("player-score").textContent = "0";
    document.getElementById("computer-score").textContent = "0";
    playerScore = 0;
    computerScore = 0;
    resetGameSound.currentTime = 0;
    resetGameSound.play();
})