import {readFileSync} from 'fs';

const seatIDs = readFileSync('./05/aoc05-input.txt', 'utf-8').trimEnd().replace(/F|L/g, '0').replace(/B|R/g, '1').split('\n')
    .map(seat => parseInt(seat, 2));

console.log(Math.max(...seatIDs), seatIDs
    .sort((a, b) => a - b)
    .filter((v, i, a) => i > 0 && v - a[i - 1] > 1)[0] - 1);
