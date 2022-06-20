import { checkRotatedPosition } from "./Validation.js";
import { displayShape } from "./DisplayShape.js";
import { theTetrominoes } from "./Shapes.js";
import { addScore } from "./Score.js";
import { gameOver } from "./Procedure.js";

//draw the Tetromino
export function draw(data: any, setData: any) {
  data.current.forEach((index: any) => {
    data.squares[data.currentPosition + index].classList.add("tetromino");
    //   data.squares[data.currentPosition + index].style.backgroundColor = colors[random];
  });
}

//undraw the Tetromino
function undraw(data: any, setData: any) {
  data.current.forEach((index: any) => {
    data.squares[data.currentPosition + index].classList.remove("tetromino");
    //   data.squares[data.currentPosition + index].style.backgroundColor = "";
  });
}

//freeze function
function freeze(data: any, setData: any) {
  if (
    data.current.some((index: any) =>
      data.squares[
        data.currentPosition + index + data.width
      ].classList.contains("taken")
    )
  ) {
    data.current.forEach((index: any) =>
      data.squares[data.currentPosition + index].classList.add("taken")
    );
    //start a new tetromino falling
    data.random = data.nextRandom;
    data.nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    data.current = theTetrominoes[data.random][data.currentRotation];
    data.currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
}

//move down function
export function moveDown(data: any, setData: any) {
  undraw();
  data.currentPosition += data.width;
  draw();
  freeze();
}

//move the tetromino left, unless is at the edge or there is a blockage
export function moveLeft(data: any, setData: any) {
  undraw();
  const isAtLeftEdge = data.current.some(
    (index: any) => (data.currentPosition + index) % data.width === 0
  );
  if (!isAtLeftEdge) data.currentPosition -= 1;
  if (
    data.current.some((index: any) =>
      data.squares[data.currentPosition + index].classList.contains("taken")
    )
  ) {
    data.currentPosition += 1;
  }
  draw();
}

//move the tetromino right, unless is at the edge or there is a blockage
export function moveRight(data: any, setData: any) {
  undraw();
  const isAtRightEdge = data.current.some(
    (index: any) =>
      (data.currentPosition + index) % data.width === data.width - 1
  );
  if (!isAtRightEdge) data.currentPosition += 1;
  if (
    data.current.some((index: any) =>
      data.squares[data.currentPosition + index].classList.contains("taken")
    )
  ) {
    data.currentPosition -= 1;
  }
  draw();
}

//rotate the tetromino
export function rotate(data: any, setData: any) {
  undraw();
  data.currentRotation++;
  if (data.currentRotation === data.current.length) {
    //if the data.current rotation gets to 4, make it go back to 0
    data.currentRotation = 0;
  }
  data.current = theTetrominoes[data.random][data.currentRotation];
  checkRotatedPosition();
  draw();
}
