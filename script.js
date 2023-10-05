const score = document.querySelectorAll('#score');

const rock = document.querySelector('#btnR');
const paper = document.querySelector('#btnP');
const scissors = document.querySelector('#btnS');

const end_prompt = document.querySelector('.end-prompt');
const end_button = document.querySelector('.end-btn');
const button = document.createElement('button');

// button style
button.innerText = 'Play Again';
button.style.fontSize = '25px';
button.style.fontWeight = 'bold';
button.style.padding = '8px 20px';
button.style.borderRadius = '10%';
button.style.backgroundColor = '#044F88';
button.style.borderColor = '#044F88';

// 40%|paper/scissors, 20%|rock
const play_rock = ["scissors", "scissors", "scissors", "scissors",
                   "paper", "paper", "paper", "paper", "rock", "rock"];
// 40%|rock/scissors, 20%|paper 
const play_paper = ["scissors", "scissors", "scissors", "scissors",
                   "rock", "rock", "rock", "rock", "paper", "paper"];
// 40%|rock/paper, 20%|scissors
const play_scissors = ["scissors", "scissors", "rock", "rock",
                       "rock", "rock", "paper", "paper", "paper", "paper"];


rock.addEventListener('click', e => {score_board(playRound("rock", play_rock[(Math.floor(Math.random() * 10))]))});
paper.addEventListener('click', e => {score_board(playRound("paper", play_paper[(Math.floor(Math.random() * 10))]))});
scissors.addEventListener('click', e => {score_board(playRound("scissors", play_scissors[(Math.floor(Math.random() * 10))]))});

// This function takes in two arguemnts and determines the result
// Returns 0: Draw
// Returns 1: Winner
// Returns -1: Loser
function playRound(playerSelection, computerSelection)
{
    console.log(playerSelection, computerSelection);

    // Draw case
    if (playerSelection === computerSelection)
    {
        return 0;
    }

    // Rock case
    if (playerSelection === "rock")
    {
        if (computerSelection === "paper")
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
    // Paper Case
    if (playerSelection === "paper")
    {
        if (computerSelection === "scissors")
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
    // Scissors Case
    if (playerSelection === "scissors")
    {
        if (computerSelection === "rock")
        {
            return -1;
        }
        else
        {
            return 1;
        }
    }
}

// This function controls the score board
// Takes in 1 arguemnt and updates the score appropriately
// Result = 1: Player wins
// Result = -1: Computer wins
// Result = 2: Reset score
function score_board(result)
{
    // my_score: "Player" score
    let my_score = score[0].innerHTML;
    // op_score: "Computer" score
    let op_score = score[1].innerHTML;

    if (result == 1)
    {
        ++my_score;
        score[0].innerHTML = my_score;
    }
    else if (result == -1)
    {
        ++op_score;
        score[1].innerHTML = op_score;
    }

    // Checks if round is over
    if (score[0].innerHTML == 5)
    {
        game_over();
        end_prompt.innerText = "You Win!";
    }
    else if (score[1].innerHTML == 5)
    {
        game_over();
        end_prompt.innerText = "You Lose!";
    }

    // Resets score
    if (result == 2)
    {
        my_score = 0;
        op_score = 0;
        score[0].innerHTML = my_score;
        score[1].innerHTML = op_score;
    }

}

// Called when a round is completed
// Displays a "play again" button for the user
function game_over()
{
    // disable the buttons
    rock.setAttribute('disabled', 'disabled');
    paper.setAttribute('disabled', 'disabled');
    scissors.setAttribute('disabled', 'disabled');

    // make "play again" button visible
    button.style.visibility = 'visible';

    // styles the button
    button_style();

    // add eventlister to button
    // on click the game will reset
    button.addEventListener('click', e => {reset_game()});

    // append the button
    end_button.appendChild(button);
}

// Called when user clicked the "Play Again" button
// Resets the score and enables buttons
function reset_game()
{
    // reset the score
    score_board(2);

    // enable all buttons
    rock.disabled = false;
    paper.disabled = false;
    scissors.disabled = false;

    // remove end prompt
    end_prompt.innerHTML = "";

    // remove play again button
    button.style.visibility = 'hidden';
}

// Givens "Play Again" button a hovering effect
function button_style()
{
    // Change the button's background color
    button.addEventListener('mouseover', () => {button.style.backgroundColor = '#5E97D0';});
      
    // Change the button's background color back to its original color
    button.addEventListener('mouseout', () => {button.style.backgroundColor = '#044F88';});
}