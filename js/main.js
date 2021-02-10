// ---- DEFINIR LES VARIABLES POUR LE STOCKAGE DE DONNÉES ---- 


let randomNumber = Math.floor(Math.random() * 100) + 1;
// Cette variable reçoit le nombre aléatoire entre 1 et 100;



let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
// Ces trois variables servent pour insérer des valeurs dans les paragraphes HTML 



let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
// Ces deux variables servent pour l'envoi de la supposée bonne réponse par l'user



let guessCount = 1;
let resetButton;

let compteur = 0;

guessSubmit.addEventListener('click', () => {

    compteur++;
    if (compteur > 0) {
        guessSubmit.value = compteur + " tentatives"
    }

});


function checkGuess() {
    let userGuess = Number(guessField.value);
    // la variable userGuess definit sa valeur 
    // par celle qui vient d'être saisi dans la champ de texte avec Field
    // Number assure que la valeur sera un nombre

    if (guessCount === 1) {
        guesses.textContent = "Propositions précédentes : ";
    }
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        lastResult.textContent = "Bravo ! tentez a nouveau votre chance";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "PERDU ! dommage, réessayez"
        setGameOver();
    } else {
        lastResult.textContent = "FAUX !";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "le nombre saisi est trop petit";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop grand !";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();

}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    compteur = 0;
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Recommencez';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}


function resetGame() {
    guessCount = 1;

    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}