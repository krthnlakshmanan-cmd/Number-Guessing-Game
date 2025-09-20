let numberToGuess, attempts;
let numberMovementInterval; // Variable to store the interval ID for number movement

// Start the game
function startGame() {
    numberToGuess = Math.floor(Math.random() * 50) + 1; // Random number between 1 and 50
    attempts = 7;
    document.getElementById('attempts').textContent = You have ${attempts} attempts to guess it.; // Correct string interpolation
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').value = '';

    // Clear previous numbers and start moving numbers
    clearNumbers();
    generateNumbers();
    startMovingNumbers();
}

// Clear existing numbers
function clearNumbers() {
    const numberContainer = document.getElementById('numberContainer');
    numberContainer.innerHTML = ''; // Clear existing numbers
}

// Generate numbers from 1 to 100
function generateNumbers() {
    const numberContainer = document.getElementById('numberContainer');
    for (let i = 1; i <= 100; i++) {
        const numberElement = document.createElement('div');
        numberElement.textContent = i;
        numberElement.classList.add('number');
        numberContainer.appendChild(numberElement);
    }
}

// Start moving numbers around the screen
function startMovingNumbers() {
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(numEl => {
        // Set initial random position
        numEl.style.position = 'absolute';
        numEl.style.top = ${Math.random() * 100}vh;
        numEl.style.left = ${Math.random() * 100}vw;

        // Random movement for numbers every 500ms
        numberMovementInterval = setInterval(() => {
            // Random position within the viewport
            const x = Math.random() * (window.innerWidth - 50);
            const y = Math.random() * (window.innerHeight - 50);
            numEl.style.transform = translate(${x}px, ${y}px); // Corrected transform syntax

            // Random color in HSL format
            const randomColor = hsl(${Math.random() * 360}, 100%, 50%); // Corrected hsl syntax
            numEl.style.color = randomColor;
        }, 500); // Change position every 500 milliseconds
    });
}

// Handle guessing the number
document.getElementById('guessButton').addEventListener('click', function() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    const message = document.getElementById('message');

    // Check if input is a valid number
    if (isNaN(guess)) {
        message.textContent = "Please enter a valid number.";
        return;
    }

    // Check if the guess is within range
    if (guess < 1 || guess > 50) {
        message.textContent = "Your guess is out of bounds (1-50). Try again.";
        return;
    }

    attempts--; // Decrease attempts on each guess

    // Check if the guess is correct
    if (guess < numberToGuess) {
        message.textContent = "Too low!";
    } else if (guess > numberToGuess) {
        message.textContent = "Too high!";
    } else {
        message.textContent = "Congratulations! You've guessed the number!";
        clearInterval(numberMovementInterval); // Stop the jumping effect
        return;
    }

    // Check if attempts are finished
    if (attempts === 0) {
        message.textContent = Sorry! The number was ${numberToGuess}. Better luck next time!;
        clearInterval(numberMovementInterval); // Stop the jumping effect
    } else {
        document.getElementById('attempts').textContent = You have ${attempts} attempts left.;
    }

    guessInput.value = ''; // Clear the input field
});

// Reset the game when the reset button is clicked
document.getElementById('resetButton').addEventListener('click', startGame);

// Start the game for the first time
startGame();
