const board = document.getElementById("chessboard");
const initialBoardState = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

let selectedSquare = null;
let currentPlayer = "white";

// Renderiza o tabuleiro inicial
function renderBoard() {
    board.innerHTML = "";
    initialBoardState.forEach((row, i) => {
        row.forEach((piece, j) => {
            const square = document.createElement("div");
            square.className = `square ${(i + j) % 2 === 0 ? "white" : "black"}`;
            square.dataset.row = i;
            square.dataset.col = j;

            if (piece) {
                const pieceElement = document.createElement("span");
                pieceElement.textContent = piece;
                pieceElement.className = "piece";
                pieceElement.dataset.color = piece === piece.toUpperCase() ? "white" : "black";
                square.appendChild(pieceElement);
            }

            square.addEventListener("click", () => handleSquareClick(i, j));
            board.appendChild(square);
        });
    });
}

// Lida com o clique na casa
function handleSquareClick(row, col) {
    const piece = initialBoardState[row][col];
    const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);

    if (selectedSquare) {
        const [selectedRow, selectedCol] = selectedSquare;
        if (isValidMove(selectedRow, selectedCol, row, col)) {
            movePiece(selectedRow, selectedCol, row, col);
            currentPlayer = currentPlayer === "white" ? "black" : "white";
        }
        selectedSquare = null;
        renderBoard();
    } else if (piece && ((piece === piece.toUpperCase() && currentPlayer === "white") || 
                         (piece === piece.toLowerCase() && currentPlayer === "black"))) {
        selectedSquare = [row, col];
        square.style.outline = "2px solid red";
    }
}

// Valida o movimento (simplificado para peões)
function isValidMove(startRow, startCol, endRow, endCol) {
    const piece = initialBoardState[startRow][startCol];
    const targetPiece = initialBoardState[endRow][endCol];
    const direction = piece === piece.toUpperCase() ? -1 : 1; // Direção do movimento (brancas para cima, pretas para baixo)

    if (piece.toLowerCase() === "p") {
        // Movimento de peão
        if (startCol === endCol && !targetPiece && endRow === startRow + direction) {
            return true; // Movimento simples
        }
        if (startCol === endCol && !targetPiece && Math.abs(endRow - startRow) === 2 &&
            ((startRow === 1 && direction === 1) || (startRow === 6 && direction === -1))) {
            return true; // Movimento inicial de duas casas
        }
        if (targetPiece && Math.abs(endCol - startCol) === 1 && endRow === startRow + direction) {
            return true; // Captura diagonal
        }
    }

    return false;
}

// Move a peça
function movePiece(startRow, startCol, endRow, endCol) {
    initialBoardState[endRow][endCol] = initialBoardState[startRow][startCol];
    initialBoardState[startRow][startCol] = "";
}

// Inicializa o jogo
renderBoard();
