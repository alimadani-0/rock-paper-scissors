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

function playRound(playerSelection, computerSelection = getComputerChoice()) {
    const WON = 'You Win!'
    const LOST = 'You Lose!'
    let winner = null
    let check = ''
    let result = ''
    let winnerChoice = ''
    let loserChoice = ''

    if (playerSelection === computerSelection) {
        return {
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

        return {
            announce: result + " " + winnerChoice + " beats " + loserChoice,
            winner: winner
        }
    }
}

function getPlayerChoice() {
    const options = ['Rock', 'Paper', 'Scissors']

    let playerChoice = prompt('Choose: Rock, Paper or Scissors?')
    playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1).toLowerCase()

    while (!options.includes(playerChoice)) {
        playerChoice = prompt('Please make a valid choice: Rock, Paper or Scissors?')
        playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1).toLowerCase()
    }
    return playerChoice
}

function game() {
    let rounds = 0
    let gameOver = false
    let playerScore = 0
    let computerScore = 0

    while (!gameOver) {
        result = playRound(getPlayerChoice(), getComputerChoice())
        console.log(result.announce)
        
        result.winner === 'tie' ? null : (result.winner === 'player' ? playerScore += 1 : computerScore += 1)
        
        rounds += 1
        rounds >= 5 && playerScore != computerScore ? gameOver = true : gameOver = false
    }

    console.log('Game Over!')
    playerScore > computerScore
        ? console.log('Congratulations! You won this game of Rock, Paper, Scissors! See you next time!')
        : console.log('You lost this game of Rock, Paper, Scissors. Better luck next time!')
}