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
    let check = ''
    let result = ''
    let winner = ''
    let loser = ''

    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()
    if (playerSelection === computerSelection) {
        console.log(playerSelection, computerSelection)
        return "It's a tie!"
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
            default:
                return "Invalid choice, please choose 'Rock', 'Paper' or 'Scissors'."
        }
        if (computerSelection === check) {
            result = WON
            winner = playerSelection
            loser = computerSelection
        } else {
            result = LOST
            winner = computerSelection
            loser = playerSelection
        }

        return result + " " + winner + " beats " + loser
    }
}