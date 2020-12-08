import {readFileSync} from 'fs';


const origBuff = readFileSync('./08/aoc08-input-test-01.txt', 'utf-8').trimEnd().split('\n').map(line => {
    const v = line.split(' ');
    return {
        code: v[0],
        value: v[1],
        exec_count: 0
    }
});

function run(buff, i): [number, number] {
    if (i >= 0) buff[i].code = 'nop';
    let p = 0, acc = 0;
    while (!(p > buff.length - 1) && !(buff[p].exec_count > 0)) {
        buff[p].exec_count++;
        switch (buff[p].code) {
            case 'jmp': {
                p += parseInt(buff[p].value);
                break;
            }
            case 'acc': acc += parseInt(buff[p].value);
            default: p++;
        }
    }
    return [p > buff.length - 1 ? 1 : 0, acc];
}

console.log(
    'Faulty result: ', run(origBuff.map(e => ({...e})), -1),
    'Corrected result: ', origBuff.map((v, i, array) =>
        v.code === 'jmp' ? run(origBuff.map(e => ({...e})), i) : [0, 0]).filter(value => value[0] > 0)[0]);
