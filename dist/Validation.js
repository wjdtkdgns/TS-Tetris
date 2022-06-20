function isAtRight(data, setData) {
    return current.some((index) => (currentPosition + index + 1) % width === 0);
}
function isAtLeft(data, setData) {
    return current.some((index) => (currentPosition + index) % width === 0);
}
export function checkRotatedPosition(P, data, setData) {
    P = P || currentPosition; //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) {
        //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
        if (isAtRight()) {
            //use actual position to check if it's flipped over to right side
            currentPosition += 1; //if so, add one to wrap it back around
            checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
        }
    }
    else if (P % width > 5) {
        if (isAtLeft()) {
            currentPosition -= 1;
            checkRotatedPosition(P);
        }
    }
}
