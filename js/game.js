function deleteView() {
    const body = document.querySelector('body');
    body.replaceChildren();
}

function setGameView() {
    deleteView();
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

function setRoundSettingView() {
    deleteView();
    const body = document.querySelector('body');
    body.id = 'set-round';

    const title = document.createElement('div');
    title.id = 'title';
    body.appendChild(title);
    
    const titleText = document.createElement('h1');
    titleText.textContent = 'How Would You Like To Play?';
    title.appendChild(titleText);

    const roundLimit = document.createElement('div');
    roundLimit.id = 'round-limit';
    body.appendChild(roundLimit);

    for (const button of ['best-of', 'first-to']) {
        const element = document.createElement('button');
        element.id = button;
        element.type = 'button';
        element.textContent = button
            .split('-')
            .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
            .join(' ');
        roundLimit.appendChild(element);
    };

    const roundCount = document.createElement('div');
    roundCount.id = 'round-count';
    body.appendChild(roundCount);

    for (const button of ['3', '5', '7']) {
        const element = document.createElement('button');
        element.id = button;
        element.type = 'button';
        element.textContent = button;
        roundCount.appendChild(element);
    };

    const begin = document.createElement('div');
    begin.id = 'begin';
    body.appendChild(begin);

    const beginButton = document.createElement('button');
    beginButton.textContent = 'Begin';
    beginButton.disabled = true;
    begin.appendChild(beginButton);
}

function setRoundOption(e) {
    this.disabled = true;
    const options = this.parentNode.id;
    const body = document.querySelector('body');
    const oldOption = body.getAttribute(options);
    if (oldOption) {
        oldOptionButton = document.getElementById(oldOption);
        oldOptionButton.disabled = false;
    };
    body.setAttribute(options, this.id);
    if (
        body.getAttribute('round-count')
        && body.getAttribute('round-limit')
    ) {
        const beginButton = document.querySelector('#begin button');
        beginButton.disabled = false;
    };
}

function updateScore(resultObject) {
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

    const gameOver = updateScore(resultObject);
    if (gameOver) {
        playerOptions.forEach(option =>
            option.removeEventListener('click', playRound)    
        )
    }
} 

setRoundSettingView();

const playerOptions = document.querySelectorAll('#playerOptions button');
playerOptions.forEach(option => 
    option.addEventListener('click', playRound)
);

const roundOptions = document.querySelectorAll('#round-limit button, #round-count button');
roundOptions.forEach(option =>
    option.addEventListener('click', setRoundOption)
);