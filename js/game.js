const body = document.querySelector('body');
let roundSettings = {};
let scores = {
    player: 0,
    computer: 0
};

function capitalizeWord(word) {
    return word.slice(0, 1).toUpperCase()
        + word.slice(1)
}

function activateRestartButton() {
    const restart = document.getElementById('restart-button');
    restart.hidden = false;
}

function deleteView() {
    body.replaceChildren();
}

function setGameView() {
    deleteView();
    body.id = 'game';
    
    const scores = document.createElement('div');
    scores.id = 'scores';
    body.appendChild(scores);
    
    for (const side of ['player', 'computer']) {
        const container = document.createElement('div');
        container.id = side;
        container.classList.add('score-container');
        scores.appendChild(container);

        const scoreInfo = document.createElement('div');
        scoreInfo.classList.add('score-info');
        scoreInfo.textContent = capitalizeWord(side) + ' Score';
        container.appendChild(scoreInfo);

        const score = document.createElement('div');
        score.id = side + '-score';
        score.classList.add('score');
        score.textContent = '0';
        container.appendChild(score);
    };
    
    if (roundSettings['round-limit'] === 'best-of') {
        roundSettings['round'] = 0;
        const roundContainer = document.createElement('div');
        roundContainer.id = 'round-container';
        scores.insertBefore(
            roundContainer, document.getElementById('computer')
        );

        const roundText = document.createElement('div');
        roundText.id = 'round-text';
        roundText.textContent = 'ROUND';
        roundContainer.appendChild(roundText);

        const round = document.createElement('div');
        round.id = 'round-count';
        round.textContent = '0';
        roundContainer.appendChild(round);

        const extraRound = document.createElement('div');
        extraRound.id = 'extra-round';
        extraRound.textContent = 'TIE BREAKER!';
        extraRound.hidden = true;
        roundContainer.appendChild(extraRound);
    };

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

    const restart = document.createElement('button');
    restart.id = 'restart-button';
    restart.textContent = 'Play Again';
    restart.hidden = true;
    body.appendChild(restart);
    restart.addEventListener('click', setRoundSettingView)

    const playerOptionsButtons = document.querySelectorAll('#playerOptions button');
    playerOptionsButtons.forEach(option =>
        option.addEventListener('click', playRound)
    );
}

function setRoundSettingView() {
    deleteView();
    roundSettings = {};
    scores = {
        player: 0,
        computer: 0
    };
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

    const roundOptions = document.querySelectorAll('#round-limit button, #round-count button');
    roundOptions.forEach(option =>
        option.addEventListener('click', setRoundOption)
    );

    beginButton.addEventListener('click', setGameView)
}

function setRoundOption(e) {
    this.disabled = true;
    const options = this.parentNode.id;
    const oldOption = roundSettings[options];
    if (oldOption) {
        oldOptionButton = document.getElementById(oldOption);
        oldOptionButton.disabled = false;
    };
    roundSettings[options] = this.id;
    if (
        roundSettings['round-count']
        && roundSettings['round-limit']
    ) {
        const beginButton = document.querySelector('#begin button');
        beginButton.disabled = false;
    };
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

function checkRoundWinner(playerSelection, computerSelection) {
    let check = '';
    if (playerSelection === computerSelection) return { winner: 'tie'};
    else {
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
        if (computerSelection === check) return {
            winner: 'player',
            winnerSelection: playerSelection,
            loserSelection: computerSelection
        };
        else return {
            winner: 'computer',
            winnerSelection: computerSelection,
            loserSelection: playerSelection
        };
    };
}

function updateRoundCounter() {
    const roundCount = document.getElementById('round-count');
    const roundCountText = roundCount.textContent;
    roundCount.textContent
        = roundCountText.slice(0, -1)
        + roundSettings['round'];
}

function updateScore(roundWinner) {
    if (roundWinner !== 'tie') {
        scores[roundWinner]++;
        const winnerScore = document.getElementById(roundWinner + '-score');
        winnerScore.textContent = scores[roundWinner];
    };
    if (roundSettings['round-limit'] === 'best-of') {
        roundSettings['round']++;
        updateRoundCounter();
    };
}

function isGameOver() {
    const playerScore = scores.player;
    const computerScore = scores.computer;
    if (roundSettings['round-limit'] === 'best-of') {
        if (roundSettings['round'] >= roundSettings['round-count']) {
            if (playerScore !== computerScore) return true;
            else {
                const extraRound = document.getElementById('extra-round');
                extraRound.hidden = false;
            }
        }
    } else {
        const roundCount = parseInt(roundSettings['round-count']);
        if (
            playerScore === roundCount
            || computerScore === roundCount
        ) return true;
    }
    return false;
}

function setRoundAnnouncement(gameOver, resultObject) {
    const WON = 'You Win!';
    const LOST = 'You Lose!';
    const announce = document.getElementById('announce');
    let announceText = '';
    if (gameOver) {
        scores.player > scores.computer
            ? announceText = 'Congratulations! You won this game of Rock, Paper, Scissors! See you next time!'
            : announceText = 'You lost this game of Rock, Paper, Scissors. Better luck next time!';
    } else {
        if (resultObject.winner !== 'tie') {
            resultObject.winner === 'player'
                ? announceText = WON
                : announceText = LOST;
            announceText
                += ' '
                + resultObject.winnerSelection
                + ' beats '
                + resultObject.loserSelection;
        } else {
            announceText = 'It\'s a tie!';
        }
    };
    announce.textContent = announceText;
}

function disablePlayerOptions () {
    playerOptionsButtons = document.querySelectorAll('#playerOptions button');
    playerOptionsButtons.forEach(option =>
        option.removeEventListener('click', playRound)
    );
}

function playRound(e) {
    const computerSelection = getComputerChoice();
    const playerSelection = this.textContent;

    const resultObject = checkRoundWinner(playerSelection, computerSelection);
    updateScore(resultObject.winner);
    const gameOver = isGameOver();
    setRoundAnnouncement(gameOver, resultObject);

    if (gameOver) {
        disablePlayerOptions();
        activateRestartButton();
    }
}

setRoundSettingView();