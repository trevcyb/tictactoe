const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const boardContainer = document.getElementById("gameContainer");
    //    board = ["X","O","X","O","X","O","X","O","X"];
    const createBoard = () => {
        for (let i = 0; i < board.length; i++) {
            const boardPlace = document.createElement("div");
            boardPlace.innerHTML = board[i];
            boardPlace.setAttribute = ("placePosition", i);
            boardContainer.appendChild(boardPlace).className = "grid-item";
        };
        return { createBoard };
    };
};

const player = (name) => {
    const getName = () => name;
    const firstturn = () => {
        if ((Math.floor(Math.random(1, 10)) % 2) === 0) {
            return true;
        } else {
            return false;
        }
    };
    const symbolSelection = () => {
        if (document.getElementById("p1").checked) {
            selection = "O";
        } else {
            selection = "X";
        }
        return { selection };
    };
    const symbolSelectionOther = (selection) => {
        if (selection === "O") {
            otherSelection = "X";
        } else {
            otherSelection = "O";
        }
    };
    const move = selection => {
        const placePlay = document.querySelectorAll(".grid-item");
        placePlay.forEach(place => place.addEventListener("click", () => {
            choice = place.dataset.placePosition;
            gameBoard.board[choice] = selection;
        }));
    };
    return { getName, firstturn, symbolSelection, move, symbolSelectionOther }
}



function gameFlow() {
    document.getElementById("settings").style.display = "none";
    const newGame = gameBoard();
    const playerOne = player("Player One");
    const playerTwo = player("Player Two");
    newGame.createBoard();
    return { newGame, newBoard, playerOne, playerTwo };
}


gameStart.addEventListener("click", gameFlow);