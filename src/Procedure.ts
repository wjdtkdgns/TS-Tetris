import { displayShape } from "./DisplayShape.js";
import { draw, moveDown } from "./Moving.js";
import { theTetrominoes } from "./Shapes.js";

const scoreDisplay: any = document.querySelector("#score");

export const buttonHandler = (data: any, setData: any) => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 1000);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
  }
};

//game over
export function gameOver(data: any, setData: any) {
  if (
    current.some((index: any) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    scoreDisplay.innerHTML = "end";
    clearInterval(timerId);
  }
}
