import {readFileSync} from 'fs';

const input = readFileSync('./09/aoc09-input.txt', 'utf-8').trimEnd().split('\n').map(value => parseInt(value));
const preLength = 25;

function findFirstInvalid() {
    for (let p = preLength, matched = false; p < input.length - 1; p++, matched = false) {
        for (let pp = p - preLength; pp < p && !matched; pp++)
            for (let ppp = p - preLength; ppp < p && !matched; ppp++)
                matched = matched || input[pp] + input[ppp] === input[p];
        if (!matched) return [p, input[p]];
    }
}

function findContigAdditives(invalidNumber: number) {
    for (let p = 0; p < input.length - 2; p++)
        if (input[p] !== invalidNumber)
            for (let pp = p, sum = 0, nn = []; pp < input.length - 1 && sum < invalidNumber; pp++) {
                sum += input[pp];
                nn.push(input[pp]);
                if (sum === invalidNumber) return nn;
            }
}

const firstInvalid = findFirstInvalid();
const sortedAdditives = findContigAdditives(firstInvalid[1]).sort();

console.log('First invalid:', firstInvalid[1], ', encryption weakness: ', sortedAdditives[0] + sortedAdditives[sortedAdditives.length - 1]);
