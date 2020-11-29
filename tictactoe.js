const boardContainer = document.getElementById("gameContainer");
let board = ["","","","","","","","",""];

const gameBoard = () => {
    board = ["X","O","X","O","X","O","X","O","X"];
    return {board};
}

const dispControl = () => {
    for(let i = 0; i < board.length; i++) {
        const boardPlace = document.createElement("div");
        boardPlace.innerHTML = board[i];
        boardContainer.appendChild(boardPlace).className = "grid-item";
    }
}

gameFlow();

function gameFlow() {
    gameBoard();
    dispControl();
}

const newPlayer = () => {
    
}

