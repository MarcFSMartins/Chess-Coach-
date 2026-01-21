const game = new Chess();

const boardElement = document.getElementById("board");

const ground = Chessground(boardElement, {
  orientation: "white",
  movable: {
    free: false,
    color: "white",
    dests: getDests()
  }
});

function getDests() {
  const dests = new Map();
  game.SQUARES.forEach(s => {
    const moves = game.moves({ square: s, verbose: true });
    if (moves.length) {
      dests.set(
        s,
        moves.map(m => m.to)
      );
    }
  });
  return dests;
}

ground.set({
  movable: {
    dests: getDests(),
    events: {
      after: onMove
    }
  }
});

function onMove(from, to) {
  const move = game.move({
    from,
    to,
    promotion: "q"
  });

  if (!move) return;

  document.getElementById("status").innerText =
    "Você jogou: " + move.san;

  ground.set({
    fen: game.fen(),
    movable: {
      dests: getDests()
    }
  });
}
