import {readFileSync} from 'fs';

const input = readFileSync('./aoc03-input.txt', 'utf-8').split('\n');
let treeM = 1;
const lineLength = input[0].length - 1;
const slopes = [[1, 1, 0], [1, 3, 0], [1, 5, 0], [1, 7, 0], [2, 1, 0]];

slopes.forEach(slope => {
    let x = 0;
    for (let y = 0; y < input.length -1; y += slope[0]) {
        const line = input[y];
        slope[2] += line[x] == "#" ? 1 : 0;
        x += slope[1];
        x = x > lineLength - 1 ? x - lineLength  : x;
    }
    treeM *= slope[2];
});

console.log('Part 1: ' + slopes[1][2]);
console.log('Part 2' + treeM);


