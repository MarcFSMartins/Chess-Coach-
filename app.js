const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let selected = null;

const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let board = [
  "rnbqkbnr",
  "pppppppp",
  "........",
  "........",
  "........",
  "........",
  "PPPPPPPP",
  "RNBQKBNR"
];

function render() {
  boardEl.innerHTML = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = document.createElement("div");
      sq.className = "square " + ((r + c) % 2 ? "black" : "white");
      const piece = board[r][c];
      if (piece !== ".") sq.textContent = pieces[piece];
      sq.dataset.pos = `${r},${c}`;
      sq.onclick = () => clickSquare(r, c, sq);
      boardEl.appendChild(sq);
    }
  }
}

function clickSquare(r, c, el) {
  if (selected) {
    const [sr, sc] = selected;
    board[r] =
      board[r].substring(0, c) +
      board[sr][sc] +
      board[r].substring(c + 1);

    board[sr] =
      board[sr].substring(0, sc) +
      "." +
      board[sr].substring(sc + 1);

    selected = null;
    statusEl.innerText = "Lance feito";
    render();
  } else if (board[r][c] !== ".") {
    selected = [r, c];
    el.classList.add("selected");
    statusEl.innerText = "Escolha a casa de destino";
  }
}

render();
