/* 
getComputerChoice:
returns either Rock, Paper, or Scissors randomly.

no input, generates random number, match number with a choice, return choice

generate number from 1 to 3
if number is 1, return rock
if number is 2, return paper
if number is 3, return scissors
*/

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

/*
playRound:
takes two inputs: playerChoice and computerChoice
compares the two inputs
returns who wins based on comparsion

[X] capitalize playerChoice
[X] if playerChoice is Rock,
        player wins against Scissors and loses against Paper
    ... etc
[X] generate result string

could use array to check winning order: ['Rock', 'Paper', 'Scissors']
item before loses, item after wins, if past array index loop (modulus)
*/

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

/*
game():
play the game 5 times, keeping a tally of who wins and reporting a winner.
tie-breaker implemeted

no input, but gets input internally for player choice
runs a round of the game, announcing winner each round
updates tally
repeats till 5 games are reached and no tie in score
output winner of game

[X] Loop
[X]     Get user choice
[X]     Play a round
[X]     Announce result
[X]     Update Tally
[X] Repeat until 5 games and no tie overall
*/

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