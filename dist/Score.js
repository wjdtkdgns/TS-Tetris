const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
export function addScore(data, setData) {
    for (let i = 0; i < 199; i += width) {
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
        if (row.every((index) => squares[index].classList.contains("taken"))) {
            score += 10;
            scoreDisplay.innerHTML = score;
            row.forEach((index) => {
                squares[index].classList.remove("taken");
                squares[index].classList.remove("tetromino");
                squares[index].style.backgroundColor = "";
            });
            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach((cell) => grid.appendChild(cell));
        }
    }
}
