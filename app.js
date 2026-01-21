/* ================== ELEMENTOS ================== */

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

/* ================== ESTADO ================== */

let selected = null;
let turn = "white";

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

const initialBoard = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

let board = structuredClone(initialBoard);

/* ================== RENDER ================== */

function render() {
  boardEl.innerHTML = "";

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement("div");
      sq.className = "square " + ((r + c) % 2 === 0 ? "light" : "dark");

      const piece = board[r][c];
      if (piece !== ".") {
        sq.textContent = pieces[piece];
        sq.classList.add(
          piece === piece.toUpperCase() ? "white-piece" : "black-piece"
        );
      }

      sq.onclick = () => onSquareClick(r, c);
      boardEl.appendChild(sq);
    }
  }

  statusEl.innerText = `Vez das ${turn === "white" ? "brancas" : "pretas"}`;
}

/* ================== INTERAÇÃO ================== */

function onSquareClick(r, c) {
  const piece = board[r][c];

  // destino após seleção
  if (selected) {
    const [sr, sc] = selected;

    if (
      isLegalMove(board, sr, sc, r, c) &&
      isPlayersPiece(board[sr][sc])
    ) {
      movePiece(sr, sc, r, c);
      turn = turn === "white" ? "black" : "white";
    }

    selected = null;
    render();
    return;
  }

  // selecionar peça
  if (piece !== "." && isPlayersPiece(piece)) {
    selected = [r, c];
  }
}

/* ================== MOVIMENTO ================== */

function movePiece(sr, sc, r, c) {
  board[r] =
    board[r].substring(0, c) +
    board[sr][sc] +
    board[r].substring(c + 1);

  board[sr] =
    board[sr].substring(0, sc) +
    "." +
    board[sr].substring(sc + 1);
}

/* ================== TURNO ================== */

function isPlayersPiece(piece) {
  return turn === "white"
    ? piece === piece.toUpperCase()
    : piece === piece.toLowerCase();
}

/* ================== RESET ================== */

function resetGame() {
  board = structuredClone(initialBoard);
  turn = "white";
  selected = null;
  render();
}

/* ================== START ================== */

render();
