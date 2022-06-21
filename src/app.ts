import { Shapes } from "./Shapes.js";

const colors = ["orange", "red", "purple", "green", "blue"];
const width = 10;
let map: HTMLElement[];
let currentPosition: number;
let currentRotation: number;
let timer: NodeJS.Timeout | null;
let score: number;
let randomShape: number;
let nextRandomShape: number;
let currentShape: number[];

document.addEventListener("DOMContentLoaded", () => {
  //////// preset ///////////

  map = Array.from(document.querySelectorAll(".grid div"));
  currentPosition = 4;
  currentRotation = 0;
  score = 0;
  randomShape = Math.floor(Math.random() * Shapes.length);
  nextRandomShape = 0;
  currentShape = Shapes[randomShape][currentRotation];

  //////// moving ///////////

  //도형 표시
  const draw = () => {
    currentShape.forEach((index: number) => {
      map[currentPosition + index].classList.add("falling");
      map[currentPosition + index].style.backgroundColor = colors[randomShape];
    });
  };

  //도형 지우기
  const undraw = () => {
    currentShape.forEach((index: number) => {
      map[currentPosition + index].classList.remove("falling");
      map[currentPosition + index].style.backgroundColor = "";
    });
  };

  //바닥에 닿았는지 확인
  const checkFreeze = () => {
    if (
      currentShape.some((index: number) =>
        map[currentPosition + index + width].classList.contains("filled")
      )
    ) {
      currentShape.forEach((index: number) =>
        map[currentPosition + index].classList.add("filled")
      );

      //새로운 모양
      currentPosition = 4;
      randomShape = nextRandomShape;
      nextRandomShape = Math.floor(Math.random() * Shapes.length);
      currentShape = Shapes[randomShape][currentRotation];
      draw();
      displayNextShape();
      addScore();
      gameOver();
    }
  };

  const moveDown = () => {
    undraw();
    currentPosition += width;
    draw();
    checkFreeze();
  };

  const moveLeft = () => {
    undraw();
    if (
      !currentShape.some(
        (index: number) => (currentPosition + index) % width === 0
      )
    ) {
      currentPosition -= 1;
    }
    if (
      currentShape.some((index: number) =>
        map[currentPosition + index].classList.contains("filled")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  };

  const moveRight = () => {
    undraw();
    if (
      !currentShape.some(
        (index: number) => (currentPosition + index) % width === width - 1
      )
    ) {
      currentPosition += 1;
    }
    if (
      currentShape.some((index: number) =>
        map[currentPosition + index].classList.contains("filled")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  };

  const rotatePosition = (position?: number) => {
    position = position || currentPosition;
    if ((position + 1) % width < 4) {
      if (isAtRight()) {
        currentPosition = currentPosition + 1;
        rotatePosition(position);
      }
    } else if (position % width > 5) {
      if (isAtLeft()) {
        currentPosition = currentPosition - 1;
        rotatePosition(position);
      }
    }
  };

  const rotate = () => {
    undraw();
    currentRotation = (currentRotation + 1) % 4;
    currentShape = Shapes[randomShape][(currentRotation + 1) % 4];
    rotatePosition();
    draw();
  };

  const control = (event: KeyboardEvent) => {
    if (event.keyCode === 37) {
      //왼
      moveLeft();
    } else if (event.keyCode === 38) {
      //위
      rotate();
    } else if (event.keyCode === 39) {
      //오
      moveRight();
    } else if (event.keyCode === 40) {
      //아래
      moveDown();
    }
  };
  document.addEventListener("keyup", control);

  //////// mini-display ///////////

  const miniDisplaySquares = document.querySelectorAll(".mini-grid div");
  const miniDisplayWidth = 4;
  const miniDisplayIndex = 0;

  const upNextfallinges = [
    [1, miniDisplayWidth + 1, miniDisplayWidth * 2 + 1, 2],
    [0, miniDisplayWidth, miniDisplayWidth + 1, miniDisplayWidth * 2 + 1],
    [1, miniDisplayWidth, miniDisplayWidth + 1, miniDisplayWidth + 2],
    [0, 1, miniDisplayWidth, miniDisplayWidth + 1],
    [
      1,
      miniDisplayWidth + 1,
      miniDisplayWidth * 2 + 1,
      miniDisplayWidth * 3 + 1,
    ],
  ];

  const displayNextShape = () => {
    miniDisplaySquares.forEach((miniSquare) => {
      miniSquare.classList.remove("falling");
      (miniSquare as HTMLElement).style.backgroundColor = "";
    });
    upNextfallinges[nextRandomShape].forEach((index: number) => {
      miniDisplaySquares[miniDisplayIndex + index].classList.add("falling");
      (
        miniDisplaySquares[miniDisplayIndex + index] as HTMLElement
      ).style.backgroundColor = colors[nextRandomShape];
    });
  };

  //////// start button ///////////

  const scoreDisplay = document.querySelector("#score") as HTMLInputElement;

  const buttonHandler = () => {
    // console.log(data);
    if (timer) {
      clearInterval(timer);
      timer = null;
    } else {
      draw();
      nextRandomShape = Math.floor(Math.random() * Shapes.length);
      timer = setInterval(moveDown, 1000);
      displayNextShape();
    }
  };

  const startBtn = document.querySelector("#start-button") as HTMLInputElement;
  startBtn.addEventListener("click", buttonHandler);

  //////// game end ///////////

  const gameOver = () => {
    if (
      currentShape.some((index: number) =>
        map[currentPosition + index].classList.contains("filled")
      )
    ) {
      scoreDisplay.innerHTML = "done";
      clearInterval(timer as NodeJS.Timeout);
    }
  };

  //////// score ///////////

  const grid = document.querySelector(".grid") as HTMLInputElement;

  const addScore = () => {
    for (let i = 0; i < 200; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (
        row.every((index: number) => map[index].classList.contains("filled"))
      ) {
        scoreDisplay.innerHTML = `${score + 10}`;
        row.forEach((index: number) => {
          map[index].classList.remove("filled");
          map[index].classList.remove("falling");
          map[index].style.backgroundColor = "";
        });
        const squaresRemoved = map.splice(i, width);
        map = squaresRemoved.concat(map);
        score = score + 10;
        map.forEach((cell: HTMLElement) => grid.appendChild(cell));
      }
    }
  };

  //////// validation ///////////

  const isAtRight = () => {
    return currentShape.some(
      (index: number) => (currentPosition + index + 1) % width === 0
    );
  };

  const isAtLeft = () => {
    return currentShape.some(
      (index: number) => (currentPosition + index) % width === 0
    );
  };
});
