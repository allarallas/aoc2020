import {readFileSync} from 'fs';

const origBuf = readFileSync('./08/aoc08-input-test-01.txt', 'utf-8').trimEnd().split('\n').map((line, index) => {
    const v = line.split(' ');
    return {
        index: index,
        code: v[0],
        value: v[1],
        exec_count: 0
    }
});
const jmpBuf = origBuf.filter(value => value.code === 'jmp');

function run(buf, i): [number, number] {
    if (i >= 0) buf[i].code = 'nop';
    let p = 0, acc = 0;
    while (!(p > buf.length - 1) && !(buf[p].exec_count > 0)) {
        buf[p].exec_count++;
        switch (buf[p].code) {
            case 'jmp': {
                p += parseInt(buf[p].value);
                break;
            }
            case 'acc':
                acc += parseInt(buf[p].value);
            default:
                p++;
        }
    }
    return [p > buf.length - 1 ? 1 : 0, acc];
}

function correct(): number {
    for (let instruction of jmpBuf) {
        const result = run(origBuf.map(e => ({...e})), instruction.index);
        if (result[0] > 0) return result[1];
    }
}

console.log('Faulty result: ', run(origBuf.map(e => ({...e})), -1)[1], 'Corrected result: ', correct());
