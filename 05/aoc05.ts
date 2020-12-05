import {readFileSync} from 'fs';

// see meetod on siin sellepärast, et esmakordselt lahendades ei näinud istmekoodis kahendarvu, vt. aoc05_alt01.ts
const calc = (seat, from, to, max, inc) =>
    [...seat.slice(from, to)].reduce((a, b) => {
        b === inc ? a[0] = a[0] + (a[1] - a[0] + 1) / 2 : a[1] = a[0] + (a[1] - a[0] + 1) / 2 - 1;
        return a;
    }, [0, max])[0];

const seatIDs = readFileSync('./05/aoc05-input.txt', 'utf-8').trimEnd().split('\n')
    .map(seat => calc(seat, 0, 7, 127, 'B') * 8 + calc(seat, 7, 10, 7, 'R'));

console.log(Math.max(...seatIDs), seatIDs
    .sort((a, b) => a - b)
    .filter((v, i, a) => i > 0 && v - a[i - 1] > 1)[0] - 1);
