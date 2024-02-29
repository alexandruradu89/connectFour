 let playerTurn = 0;
 let tableNotCreated = true;
 const boardWidth = 7, boardHight = 6;
 const matrix = Array.from({length: boardHight}, () =>
                new Array(boardWidth).fill()); 

 function createTable() {
    resetWinnerMessage();
    if (tableNotCreated) {
        tableNotCreated = false;
        const displayTable = document.createElement("table");
        const tableBody = document.createElement("tbody");
    
        for (let i = 0; i < boardHight; ++i) {
            const row = document.createElement("tr");
            for (let j = 0; j < boardWidth; ++j) {
                const cell = document.createElement("td");
                cell.id = i + "-" + j;
                const cellText = document.createTextNode("");
                //cell.classList.add("cell");
                cell.appendChild(cellText);
                cell.setAttribute("style", "border: 1px solid black; width: 15%; height: 15%");
                row.appendChild(cell);
                cell.addEventListener("click", () => setValue(cell));
            }
            tableBody.appendChild(row);
        }
    
        displayTable.appendChild(tableBody);
        document.body.appendChild(displayTable);
    } else {
        resetTable();
    }
 }

 function resetTable() {
    playerTurn = 0;
    for (let i  = 0; i < boardHight; ++i) {
        for (let j = 0; j < boardWidth; ++j) {
            matrix[i][j] = "";
            let cellId = i + "-" + j;
            let currentCell = document.getElementById(cellId);
            currentCell.textContent = "";
        }
    }   
 }

 function resetWinnerMessage() {
    const message = document.getElementById("winnerMessage");
    message.innerHTML = "";
 }

 function setValue(cell) {
    let initialLine = parseInt(cell.id.charAt(0));
    console.log("selectedLine = " + initialLine);
    let column = parseInt(cell.id.charAt(2));
    console.log("selectedColumn = " + column);
    for (let i = 5; i >= 0; --i) {
        newId = i + "-" + column;
        let newCell = document.getElementById(newId);
        if (!newCell.textContent) {
            let symbol = playerSymbol(playerTurn);
            newCell.textContent = symbol;
            ++playerTurn;
            matrix[i][column] = newCell.textContent;
            console.log(matrix);
            if (checkIfWon(symbol)) {
                const message = document.getElementById("winnerMessage");
                message.innerHTML = "Player " + symbol + " won!";
            }
            break;
        }
    }
 }

 function playerSymbol(playerTurn) {
    if (playerTurn % 2 === 0) {
        return "X";
    } 
        return "O";
 }

 function checkIfWon(symbol) {
    for (let i = 0; i < boardHight; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (symbol === matrix[i][j] &&
                symbol === matrix[i][j + 1] &&
                symbol === matrix[i][j + 2] &&
                symbol === matrix[i][j + 3] ) {
                return true;
            }
        }
    }

    for (let j = 0; j < boardWidth; ++j) {
        consecutiveSymbols = 0;
        for (let i = 0; i < 3; ++i) {
            if (symbol === matrix[i][j] &&
                symbol === matrix[i + 1][j] &&
                symbol === matrix[i + 2][j] &&
                symbol === matrix[i + 3][j] ) {
                return true;
            }
        }
    }

    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (symbol === matrix[i][j] &&
                symbol === matrix[i + 1][j + 1] &&
                symbol === matrix[i + 2][j + 2] &&
                symbol === matrix[i + 3][j + 3]) {
                return true;    
            }
        }
    }

    for (let i = 3; i < boardHight; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (symbol === matrix[i][j] &&
                symbol === matrix[i - 1][j + 1] &&
                symbol === matrix[i - 2][j + 2] &&
                symbol === matrix[i - 3][j + 3]) {
                return true;
            }
        }
    }

    if (playerTurn === (boardHight * boardWidth)) {
        const message = document.getElementById("winnerMessage");
        message.innerHTML = "It's a tie!";
    }
 }
