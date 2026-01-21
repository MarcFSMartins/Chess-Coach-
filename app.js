const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

const engine = Stockfish();
engine.postMessage("uci");

let lastEval = 0;

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  board.position(game.fen());

  analyzePosition();
}

function analyzePosition() {
  engine.postMessage("position fen " + game.fen());
  engine.postMessage("go depth 15");
}

engine.onmessage = function (event) {
  const line = event.data;

  if (line.startsWith("info depth 15 score")) {
    const score = parseScore(line);
    const delta = score - lastEval;
    lastEval = score;

    const label = classify(delta);
    document.getElementById("comment").innerText =
      `${label} | Avaliação: ${score}`;
  }

  if (line.startsWith("bestmove")) {
    const best = line.split(" ")[1];
    document.getElementById("comment").innerText +=
      ` | Melhor lance: ${best}`;
  }
};

function parseScore(info) {
  if (info.includes("mate")) return 10000;
  const match = info.match(/score cp (-?\d+)/);
  return match ? parseInt(match[1]) / 100 : 0;
}

function classify(delta) {
  if (delta >= -0.2) return "Excelente";
  if (delta >= -0.5) return "Bom";
  if (delta >= -1.2) return "Imprecisão";
  if (delta >= -3) return "Erro";
  return "Blunder";
}
