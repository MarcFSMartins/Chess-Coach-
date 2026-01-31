function onSquareClick(square) {
  const piece = chess.get(square);

  if (selectedSquare) {
    const move = chess.move({
      from: selectedSquare,
      to: square,
      promotion: "q"
    });

    if (move) {
      selectedSquare = null;
      clearHighlights();
      drawBoard();
    }

    return;
  }

  if (!piece || piece.color !== chess.turn()) return;

  selectedSquare = square;
  clearHighlights();

  getSquareEl(square)?.classList.add("selected");

  chess.moves({ square, verbose: true })
    .forEach(m => {
      getSquareEl(m.to)?.classList.add("valid");
    });
}
