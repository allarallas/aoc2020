// sum([0x10000 * len(set.intersection(*map(set, group.split('\n')))) + len(set(group.replace('\n', ''))) for group in open('input.txt').read().split('\n\n')])
// print("Part 1:{}\nPart 2:{}".format(s & 0xffff, s >> 16)). See on ilma otseste kordusteta 1. ja 2. osas

import {readFileSync} from 'fs';

const wtf = readFileSync('./06/aoc06-input.txt', 'utf-8').trimEnd().split('\n\n')
    .map(group => 0x10000 * group.split('\n')
            .reduce((p, c) => p.filter(v => c.indexOf(v) >= 0), group.split('\n')[0].split('')).length
        + new Set(group.match(/\w/g)).size
    ).reduce((p, c) => p + c)

console.log('Misread result: ', wtf & 0xffff, 'Correct result: ', wtf >> 0x10);
