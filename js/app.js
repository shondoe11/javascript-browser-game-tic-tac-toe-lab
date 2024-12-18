/* Min Requirements
Display an empty tic-tac-toe board when the page is initially displayed.
A player can click on the nine cells to make a move.
Every click will alternate between marking an X and O.
Display whose turn it is (X or O).
The cell cannot be played again once occupied with an X or O.
Provide win logic and display a winning message.
Provide logic for a cat’s game (tie), also displaying a message.
Provide a Reset Game button that will clear the contents of the board.
*/
/*
1) Define the required variables used to track the state of the game.

2) Store cached element references.

3) Upon loading, the game state should be initialized, and a function should be called to render this game state.

4) The state of the game should be rendered to the user.

5) Define the required constants.

6) Handle a player clicking a square with a `handleClick` function.

7) Create Reset functionality.
*/


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6] // diagonal from top-right to bottom-left
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
console.log(squareEls);
console.log(messageEl);
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['','','','','','','','','',];
    turn = 'X';
    winner = false;
    tie = false;
    //additional
    console.log('Game started!');
    render();
}

function handleClick(event) {
    const squareIndex = Number(event.target.id);
    if (board[squareIndex] !== '' || winner) {
        return;
    }
    //board[squareIndex]
    placePiece(squareIndex);
    checkForWinner();
    console.log(`Winner status: S{winner}`); //test log winner stat
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
    board[index] = turn;
    console.log(board);
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            console.log(`Winner: ${board[a]}`); //test log winner
            return;
        }
    });
    if (!winner && !board.includes('')) {
        tie = true;
        console.log(`It's a tie!`); //test log tie
    }
}

function checkForTie() {
    if (winner) return;
    if (!board.includes('')) {
        tie = true;
        console.log('Tie status: true'); //test log tie
    } else {
        console.log('Tie status: false') // test log tie
    }
}

function switchPlayerTurn() {
    if (winner) return;
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
    console.log(`Turn switched to: ${turn}`); // test log new turn
}

/*----------------------------- Event Listeners -----------------------------*/

init();
function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((value, index) => {
        const square = squareEls[index];
    square.textContent = value;
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (!winner && tie) {
        messageEl.textContent = `It's a Tie!`;
    } else {
        messageEl.textContent = `Congratulations, ${turn} wins!!!`
    }
}
//!Commited to option 1, not confident about option 2 level up
squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);
