const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();
document.getElementById("restartButton").addEventListener("click", function() {
    location.reload();
})

function TicTacToeGame() {
    const board = new Board();
    const player1 = new Player1(board);
    const player2 = new Player2(board);
    let turn = 0;

    this.start = function() {
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }

    function takeTurn() {
        if (board.checkForWinner()) {
            return;
        }
        if (turn % 2 === 0) {
            player1.takeTurn();
        } else {
            player2.takeTurn();
        }
        turn++;
    }
}

function Board() {
    const boardContainer = document.querySelector("#gameContainer");
    for (let i = 0; i < 9 ; i++) {
        const boardPlace = document.createElement("div");
        boardPlace.innerText = "";
        boardPlace.id = i;
        boardContainer.appendChild(boardPlace).className = "grid-item";
    }
    this.positions = Array.from(document.querySelectorAll(".grid-item"));
    this.checkForWinner = function() {
        let winner = false;
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [1, 4, 7]
        ];

        const positions = this.positions;

        winCombos.forEach((winCombo) => {
            const pos0InnerText = positions[winCombo[0]].innerText;
            const pos1InnerText = positions[winCombo[1]].innerText;
            const pos2InnerText = positions[winCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== "" &&
            pos0InnerText === pos1InnerText &&
            pos1InnerText === pos2InnerText;

            if(isWinningCombo) {
                winner = true;
                winCombo.forEach((index) => {
                    positions[index].className += " winner";
                })
            }
            if(isWinningCombo === true && pos0InnerText === 'X') {
                document.getElementById("infodiv").innerText = "You Win!!";
            } else if(isWinningCombo === true && pos0InnerText ==='O') {
                document.getElementById("infodiv").innerText = "You Lose :(";
            }
        });
        return winner;
    }
}

function Player1(board) {
    this.takeTurn = function () {
        board.positions
            .forEach(el => el.addEventListener("click", handleTurnTaken));

    }

    function handleTurnTaken(event) {
        event.target.innerText = 'X';
        board.positions
            .forEach(el => el.removeEventListener("click", handleTurnTaken));
    }
}

function Player2(board) {
    this.takeTurn = function () {
        const availablePositions = 
            board.positions.filter((p) => p.innerText === "");
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O';
    }
}