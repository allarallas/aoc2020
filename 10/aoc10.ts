import {readFileSync} from 'fs';

let input = readFileSync('./10/aoc10-input.txt', 'utf-8').trimEnd().split('\n').map(v => parseInt(v)).sort((a, b) => a - b);
input = [0, ...input, input[input.length - 1] + 3];

const diffs = [];
for (let n = 1; n < input.length; n++)
    diffs.push(input[n] - input[n - 1]);

const streaks = [];
for (let i = 0, p = 0; i < diffs.length - 1; i++, p = i) {
    while (diffs[i + 1] === 1 && diffs[i] === 1) i++;
    if (i !== p) streaks.push(i - p + 1);
}

console.log('1 x 3:',
    diffs.filter(v => v === 1).length * diffs.filter(v => v === 3).length,
    ', omg:',
    streaks.map(v => {
        let p = 1;
        for (let i = 1; i < v; i++) p += i;
        return p;
    }).reduce((a, v) => a * v, 1)
);
