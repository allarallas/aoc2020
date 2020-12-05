import {readFileSync} from 'fs';

function calc(code, min, max, inc) {
    for (let c of code) {
        c === inc ? min = min + (max - min + 1) / 2 : max = min + (max - min + 1) / 2 - 1;
    }
    return min;
}

const seatIDs = readFileSync('./05/aoc05-input.txt', 'utf-8')
    .trimEnd().split('\n')
    .map(seat => calc(seat.slice(0, 7), 0, 127, 'B') * 8 +
        calc(seat.slice(7, 10), 0, 7, 'R'));

console.log(Math.max(...seatIDs), seatIDs
    .sort((a, b) => a - b)
    .filter((value, index, array) => index > 0 && value - array[index - 1] > 1)[0] - 1);
