const domEx = (() => {
    return {
        boardContainer: document.getElementById("gameContainer"),
        createBoard: function () {
            this.boardContainer.style.display = "none";
            for (let i = 0; i < gameBoard.board.length; i++) {
                const boardPlace = document.createElement("div");
                boardPlace.innerHTML = gameBoard.board[i];
                boardPlace.setAttribute("data-place", i);
                this.boardContainer.appendChild(boardPlace).className = "grid-item";
            }
        },
        symbolSelection: function () {
            if (document.getElementById("p1").checked) {
                selection = "O";
                p2selection = "X";
            } else {
                selection = "X";
                p2selection = "O";
            }
            return { selection, p2selection };
        },
        startGame: function () {
            const gameStart = document.getElementById("gameStart");
            gameStart.addEventListener("click", function () {
                document.getElementById("settings").style.display = "none";
                domEx.boardContainer.style.display = "grid";
            })
        },
        firstTurnDecider: function () {
            const infodiv = document.getElementById("infodiv");
            if ((Math.floor(Math.random(1, 11)) % 2) === 0) {
                p1play = true;
                infodiv.innerHTML = "Player One's Turn";
                return p1play;
            } else {
                p1play = false;
                infodiv.innerHTML = "Player Two's Turn";
                return p1play;
            }
        },
        turnDecider: function () {
            p1play = !p1play;
            if (p1play === true) {
                infodiv.innerHTML = "Player One's Turn";
            } else {
                infodiv.innerHTML = "Player Two's Turn";
            }
            return p1play;
        },
        move: function () {
            const blocks = document.querySelectorAll(".grid-item");
            blocks.forEach(block => block.addEventListener("click", function () {
                choice = block.dataset.place;
                    if (p1play === true) {
                        gameBoard.board[choice] = selection;
                        block.innerHTML = selection;
                    } else {
                        gameBoard.board[choice] = p2selection;
                        block.innerHTML = p2selection;
                    }
                domEx.turnDecider();
            }, {once: true}));
        }
    }
})()

const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],
    winCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 4, 7]
    ]
}

const player = name => {
    const initPlayer = () => {
        return name;
    };
    const setSymbol = () => {
        i++;
        domEx.symbolSelection();
        if (i = 1) {
            player.symbol = selection;
            return player.symbol;
        } else {
            player.symbol = p2selection;
            return player.symbol;
        }
    };
    const symbol = setSymbol();
    return { initPlayer, setSymbol, symbol }
}

let i = 0;
domEx.createBoard()
domEx.startGame()
domEx.firstTurnDecider()
const jim = player('jim');
const tom = player('tom');
domEx.move()




