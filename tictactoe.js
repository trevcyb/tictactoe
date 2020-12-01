const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],
    get createBoard() {
        boardContainer = document.getElementById("gameContainer");
        for (let i = 0; i < this.board.length; i++) {
            const boardPlace = document.createElement("div");
            boardPlace.innerHTML = this.board[i];
            boardPlace.setAttribute = ("placePosition", i);
            boardContainer.appendChild(boardPlace).className = "grid-item";
        }
    }
}

function player(name) {
    return {
        name,
        firstturn() {
            if ((Math.floor(Math.random(1, 10)) % 2) === 0) {
                return true;
            } else {
                return false;
            }
        },
        symbolSelection() {
            if (document.getElementById("p1").checked) {
                selection = "O";
                p2selection = "X";
            } else {
                selection = "X";
                p2selection = "O";
            }
            return { selection, p2selection };
        },

        move(selection) {
            const placePlay = document.querySelectorAll(".grid-item");
            placePlay.forEach(place => place.addEventListener("click", () => {
                choice = place.dataset.placePosition;
                gameBoard.board[choice] = selection;
            }));
        }
    };
}



/* function gameFlow() {
    document.getElementById("settings").style.display = "none";
    const newGame = gameBoard.createBoard();
    const playerOne = player("Player One");
    const playerTwo = player("Player Two");
    newGame.createBoard();
    return { newGame, newBoard, playerOne, playerTwo };
} */

const jim = player('jim');

gameStart.addEventListener("click", function () {
    document.getElementById("settings").style.display = "none";
    gameBoard.createBoard;
});

