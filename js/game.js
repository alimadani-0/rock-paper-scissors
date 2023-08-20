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