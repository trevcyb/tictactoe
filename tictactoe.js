const domEx = (() => {
    return {
        boardContainer: document.getElementById("gameContainer"),
        createBoard: function () {
            this.boardContainer.style.display = "none";
            for (let i = 0; i < gameBoard.origBoard.length; i++) {
                const boardPlace = document.createElement("div");
                boardPlace.innerHTML = "";
                boardPlace.id = i;
                this.boardContainer.appendChild(boardPlace).className = "grid-item";
            }
        },
        symbolSelection: function () {
            if (document.getElementById("p1").checked) {
                player1 = 'O';
                player2 = 'X';
            } else {
                player1 = 'X';
                player2 = 'O';
            }
            return { player1, player2 };
        },
        startGame: function () {
            const gameStart = document.getElementById("gameStart");
            gameStart.addEventListener("click", function () {
                document.getElementById("settings").style.display = "none";
                domEx.boardContainer.style.display = "grid";
            })
        },
        move: function () {
            const blocks = document.querySelectorAll(".grid-item");
            blocks.forEach(block => block.addEventListener("click", domEx.turnClick, { once: true }));
        },
        turnClick: function (block) {
            if (typeof gameBoard.origBoard[block.target.id] == 'number') {
                domEx.turn(block.target.id, player1);
                if (!gameBoard.checkTie()) domEx.turn(gameBoard.bestSpot(), player2);
            }
        },
        turn: function (placeID, player) {
            gameBoard.origBoard[placeID] = player;
            document.getElementById(placeID).innerText = player;
            let gameWon = gameBoard.checkWin(gameBoard.origBoard, player);
            if (gameWon) gameBoard.gameOver(gameWon)
        }
    }
})()

const gameBoard = (() => {
    return {
        origBoard: Array.from(Array(9).keys()),
        winCombos: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            [1, 4, 7]
        ],
        checkWin: function (board, player) {
            let plays = this.origBoard.reduce((a, e, i) =>
                (e === player) ? a.concat(i) : a, []);
            let gameWon = null;
            for (let [index, win] of this.winCombos.entries()) {
                if (win.every(elem => plays.indexOf(elem) > -1)) {
                    gameWon = { index: index, player: player };
                    break;
                }
            }
            return gameWon;
        },
        gameOver: function (gameWon) {
            for (let index of this.winCombos[gameWon.index]) {
                document.getElementById(index).style.backgroundColor =
                    gameWon.player == player1 ? "blue" : "red";
            }
            const blocks = document.querySelectorAll(".grid-item");
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].removeEventListener('click', domEx.turnClick, { once: true })
            }
            this.declareWinner(gameWon.player == player1 ? "You Win!" : "You Lose!");
        },
        emptySquares: function () {
            return this.origBoard.filter(s => typeof s == 'number');
        },
        bestSpot: function () {
            return this.emptySquares()[0];
        },
        checkTie: function () {
            const blocks = document.querySelectorAll(".grid-item");
            if (this.emptySquares().length == 0) {
                for (let i = 0; i < blocks.length; i++) {
                    blocks[i].style.backgroundColor = "green";
                    blocks[i].removeEventListener('click', domEx.turnClick, false);
                }
                this.declareWinner("Tie Game");
                return true;
            }
            return false;
        },
        declareWinner: function (who) {
            document.querySelector("#infodiv").innerText = who;
        },
    }
})()

function game() {
    domEx.createBoard()
    domEx.startGame()
    domEx.symbolSelection()
    domEx.move()
};

game();




