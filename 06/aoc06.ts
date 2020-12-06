import {readFileSync} from 'fs';

const input = readFileSync('./06/aoc06-input.txt', 'utf-8').trimEnd().split('\n\n');

const p1 = input.reduce((p, c) => p + new Set(c.match(/\w/g)).size, 0);

const p2 = input
    .map(group => group.split('\n')
        .reduce((p, c) => p.filter(v => c.indexOf(v) >= 0), group.split('\n')[0].split('')).length)
    .reduce((p, c) => p + c);

console.log('Misread result: ', p1, 'Correct result: ', p2);
