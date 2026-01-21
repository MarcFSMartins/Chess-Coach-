/* ================== UTIL ================== */

function isSameColor(a, b) {
  return (a === a.toUpperCase()) === (b === b.toUpperCase());
}

/* ================== PEÇAS ================== */

function pawnMove(board, piece, sr, sc, r, c) {
  const dr = r - sr;
  const dc = c - sc;
  const dir = piece === "P" ? -1 : 1;
  const startRow = piece === "P" ? 6 : 1;

  if (dc === 0 && board[r][c] === ".") {
    if (dr === dir) return true;
    if (sr === startRow && dr === 2 * dir && board[sr + dir][sc] === ".")
      return true;
  }

  if (Math.abs(dc) === 1 && dr === dir && board[r][c] !== ".") return true;

  return false;
}

function rookMove(board, sr, sc, r, c) {
  if (sr !== r && sc !== c) return false;
  return clearPath(board, sr, sc, r, c);
}

function bishopMove(board, sr, sc, r, c) {
  if (Math.abs(r - sr) !== Math.abs(c - sc)) return false;
  return clearPath(board, sr, sc, r, c);
}

function queenMove(board, sr, sc, r, c) {
  return rookMove(board, sr, sc, r, c) || bishopMove(board, sr, sc, r, c);
}

function knightMove(dr, dc) {
  return (
    (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
    (Math.abs(dr) === 1 && Math.abs(dc) === 2)
  );
}

function kingMove(dr, dc) {
  return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
}

/* ================== CAMINHO LIVRE ================== */

function clearPath(board, sr, sc, r, c) {
  const stepR = Math.sign(r - sr);
  const stepC = Math.sign(c - sc);

  let cr = sr + stepR;
  let cc = sc + stepC;

  while (cr !== r || cc !== c) {
    if (board[cr][cc] !== ".") return false;
    cr += stepR;
    cc += stepC;
  }
  return true;
}

/* ================== API PRINCIPAL ================== */

function isLegalMove(board, sr, sc, r, c) {
  const piece = board[sr][sc];
  const target = board[r][c];

  if (target !== "." && isSameColor(piece, target)) return false;

  const dr = r - sr;
  const dc = c - sc;

  switch (piece.toLowerCase()) {
    case "p": return pawnMove(board, piece, sr, sc, r, c);
    case "r": return rookMove(board, sr, sc, r, c);
    case "n": return knightMove(dr, dc);
    case "b": return bishopMove(board, sr, sc, r, c);
    case "q": return queenMove(board, sr, sc, r, c);
    case "k": return kingMove(dr, dc);
  }
  return false;
}
