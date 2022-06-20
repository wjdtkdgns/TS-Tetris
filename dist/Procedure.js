import { displayShape } from "./DisplayShape.js";
import { draw, moveDown } from "./Moving.js";
import { theTetrominoes } from "./Shapes.js";
const scoreDisplay = document.querySelector("#score");
export const buttonHandler = (data, setData) => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
    else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        displayShape();
    }
};
//game over
export function gameOver(data, setData) {
    if (current.some((index) => squares[currentPosition + index].classList.contains("taken"))) {
        scoreDisplay.innerHTML = "end";
        clearInterval(timerId);
    }
}
