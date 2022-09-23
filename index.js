let playerText = document.getElementById('playerText');
let resetBtn = document.getElementById('resetBtn');
let gridBoxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_grids');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let grids = Array(9).fill(null);

const startGame = () => {
    gridBoxes.forEach(box => box.addEventListener('click', gridBoxClicked));
}

function gridBoxClicked(e) {
    const id = e.target.id;

    if(!grids[id]) {
        grids[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerWins() !==false) {
            playerText = `${currentPlayer} wins the game!`;
            let winning_grids = playerWins();

            winning_grids.map( box => gridBoxes[box].style.backgroundColor = winnerIndicator);
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function playerWins() {
    for (const condition of winningCombos) {
        let [a,b,c] = condition;

        if(grids[a] && (grids[a] == grids[b] && grids[a] == grids[c])) {
            return [a,b,c];
        }
    }
        return false;
}


resetBtn.addEventListener('click', reset);

function reset() {
    grids.fill(null);

    gridBoxes.forEach(box => {
        box.innerHTML = '';
        box.style.backgroundColor = '';
    });

    playerText = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame();