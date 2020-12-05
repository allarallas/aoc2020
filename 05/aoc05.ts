import {readFileSync} from 'fs';

const seatIDs: number[] = [];

function calc(code: string, max: number, inc: string, dec: string ) {
    let min = 0;
    for(let c of code) {
        min = c === inc ? min + (max - min + 1) / 2 : min;
        max = c === dec ? min + (max - min + 1) / 2 - 1 : max;
    }
    return min;
}

readFileSync('./05/aoc05-input.txt', 'utf-8')
    .trimEnd().split('\n')
    .forEach((seat: string) => {
        seatIDs.push(
        calc(seat.slice(0,7),127,'B', 'F') * 8 +
         calc(seat.slice(7,10),7,'R', 'L'));
    });

console.log(Math.max(...seatIDs));
console.log(seatIDs
    .sort((a, b) => a - b)
    .filter((value, index, array) => index > 0 && value - array[index - 1] > 1)[0] - 1);
