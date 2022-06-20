const colors = ["orange", "red", "purple", "green", "blue"];

//show up-next tetromino in mini-grid display
const displaySquares = document.querySelectorAll(".mini-grid div");
const displayWidth = 4;
const displayIndex = 0;

//the Tetrominos without rotations
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
  [0, 1, displayWidth, displayWidth + 1], //oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
];

//display the shape in the mini-grid display
export function displayShape(data: any, setData: any) {
  //remove any trace of a tetromino form the entire grid
  displaySquares.forEach((square) => {
    square.classList.remove("tetromino");
    //   square.style.backgroundColor = "";
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add("tetromino");
    //   displaySquares[displayIndex + index].style.backgroundColor =
    // colors[nextRandom];
  });
}
