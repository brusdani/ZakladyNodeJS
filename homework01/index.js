const secretNumber = Math.floor(Math.random() * 11);

let attemptsCount = 0;
const maxAttempts = 5;

while (attemptsCount < maxAttempts) {
    let remaining = maxAttempts - attemptsCount;
    let input = prompt(`Guess the number (0-10).\nAttempts left: ${remaining}`);

    if (input === null) {
        alert("Game cancelled.");
        break;
    }

    let guess = Number(input);

    if (isNaN(guess) || input.trim() === "" || guess < 0 || guess > 10) {
        alert("Invalid input! Please enter a number between 0 and 10. This didn't count as an attempt.");
        continue;
    }
    attemptsCount++;

    if (guess === secretNumber) {
        alert("Congratulations! You guessed the secret number! It truly was: " + secretNumber);
        break;
    } else {
        if (attemptsCount < maxAttempts) {
            if (guess < secretNumber) {
                alert("Secret number is HIGHER");
            } else {
                alert("Secret number is SMALLER");
            }
        } else {
            alert("You lost! You ran out of attempts. The number was: " + secretNumber);
        }
    }
}
