import { theTetrominoes } from "./Shapes.js";
import { moveDown, moveLeft, moveRight, rotate } from "./Moving.js";
import { buttonHandler } from "./Procedure.js";

const width = 10;
let squares: any;
let currentPosition: any;
let currentRotation: any;
let nextRandom: any;
let timerId: any;
let score: any;
let random: any;
let current: any;

document.addEventListener("DOMContentLoaded", () => {
  nextRandom = 0;
  score = 0;

  squares = Array.from(document.querySelectorAll(".grid div"));
  currentPosition = 4;
  currentRotation = 0;

  //randomly select a Tetromino and its first rotation
  random = Math.floor(Math.random() * theTetrominoes.length);
  current = theTetrominoes[random][currentRotation];

  //assign functions to keyCodes

  const Data = {
    width,
    squares,
    currentPosition,
    currentRotation,
    nextRandom,
    timerId,
    score,
    random,
    current,
  };

  const setData = (props: any) => {
    currentPosition = props.currentPosition;
    currentRotation = props.currentRotation;
    nextRandom = props.nextRandom;
    timerId = props.timerId;
    score = props.score;
    random = props.random;
    current = props.current;
  };

  function control(e: any) {
    if (e.keyCode === 37) {
      moveLeft(Data, setData);
    } else if (e.keyCode === 38) {
      rotate(Data, setData);
    } else if (e.keyCode === 39) {
      moveRight(Data, setData);
    } else if (e.keyCode === 40) {
      moveDown(Data, setData);
    }
  }
  document.addEventListener("keyup", control);

  //add functionality to the button
  const startBtn: any = document.querySelector("#start-button");
  startBtn.addEventListener("click", buttonHandler.bind(null, Data, setData));
});
