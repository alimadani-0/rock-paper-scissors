function loadGameView() {
    const body = document.querySelector('body');
    body.id = 'game';

    const scores = document.createElement('div');
    scores.id = 'scores';
    body.appendChild(scores);

    const playerScore = document.createElement('div');
    playerScore.id = 'player';
    playerScore.textContent = 'Player Score: 0'
    scores.appendChild(playerScore);

    const computerScore = document.createElement('div');
    computerScore.id = 'computer';
    computerScore.textContent = 'Computer Score: 0'
    scores.appendChild(computerScore);

    const playerOptions = document.createElement('div');
    playerOptions.id = 'playerOptions';
    body.appendChild(playerOptions);

    const rockButton = document.createElement('button');
    rockButton.id = 'Rock';
    rockButton.classList.add('playerOption');
    rockButton.textContent = 'Rock';
    playerOptions.appendChild(rockButton);
    
    const paperButton = document.createElement('button');
    paperButton.id = 'Paper';
    paperButton.classList.add('playerOption');
    paperButton.textContent = 'Paper';
    playerOptions.appendChild(paperButton);
    
    const scissorsButton = document.createElement('button');
    scissorsButton.id = 'Scissors';
    scissorsButton.classList.add('playerOption');
    scissorsButton.textContent = 'Scissors';
    playerOptions.appendChild(scissorsButton);

    const announce = document.createElement('div');
    announce.id = 'announce';
    body.appendChild(announce);
}

function updateScores(resultObject) {
    let gameOver = false;
    const announce = document.querySelector('div#announce');
    
    if (resultObject.winner === 'tie') {
        announce.textContent = resultObject.announce
    } else {
        const winner = document.querySelector(`#${resultObject.winner}`);
        let winnerScoreText = winner.textContent;
        const winnerScore = parseInt(winnerScoreText.slice(-1)) + 1;
        winner.textContent 
            = winnerScoreText.slice(0, -1) 
            + winnerScore;
        if (winnerScore === 5) {
            gameOver = true;
            resultObject.winner === 'player' 
                ? announce.textContent = 'Congratulations! You won this game of Rock, Paper, Scissors! See you next time!'
                : announce.textContent = 'You lost this game of Rock, Paper, Scissors. Better luck next time!';
        } else announce.textContent = resultObject.announce;
    }
    return gameOver
}

function getComputerChoice() {
    let generatedValue = Math.floor(Math.random() * 3) + 1
    switch (generatedValue) {
        case 3:
            return 'Scissors'
        case 2:
            return 'Paper'
        default:
            return 'Rock'
    }
}

function playRound(e) {
    const computerSelection = getComputerChoice()
    const WON = 'You Win!'
    const LOST = 'You Lose!'
    let winner = null
    let check = ''
    let result = ''
    let winnerChoice = ''
    let loserChoice = ''
    let resultObject = {}

    let playerSelection = this.textContent

    if (playerSelection === computerSelection) {
        resultObject = {
            announce: "It's a tie!",
            winner: 'tie'
        }
    } else {
        switch (playerSelection) {
            case 'Rock':
                check = 'Scissors';
                break;
            case 'Paper':
                check = 'Rock';
                break;
            case 'Scissors':
                check = 'Paper';
                break;
        }
        if (computerSelection === check) {
            result = WON
            winnerChoice = playerSelection
            loserChoice = computerSelection
            winner = 'player'
        } else {
            result = LOST
            winnerChoice = computerSelection
            loserChoice = playerSelection
            winner = 'computer'
        }

        resultObject = {
            announce: result + " " + winnerChoice + " beats " + loserChoice,
            winner: winner
        }
    }

    const gameOver = updateScores(resultObject);
    if (gameOver) {
        playerOptions.forEach(option =>
            option.removeEventListener('click', playRound)    
        )
    }
} 

loadGameView();

const playerOptions = document.querySelectorAll('#playerOptions button');
playerOptions.forEach(option => 
    option.addEventListener('click', playRound)
);