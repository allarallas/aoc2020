import {readFileSync} from 'fs';

// const input = readFileSync('./04/aoc04-input-test-01.txt', 'utf-8')
// const input = readFileSync('./04/aoc04-input-test-02.txt', 'utf-8')
const input = readFileSync('./04/aoc04-input.txt', 'utf-8')
    .trimEnd().replace(/\r\n/g, ' ').split('  ');

let validLevel1 = 0;
let validLevel2 = 0;

let validate = {
    byr: (value: number) => value >= 1920 && value <= 2002,
    iyr: (value: number) => value >= 2010 && value <= 2020,
    eyr: (value: number) => value >= 2020 && value <= 2030,
    hgt: (value: string) => {
        const height = value.match(/[a-zA-Z]+|[0-9]+/g)
        return (
            (height[1] === 'cm' && parseInt(height[0]) >= 150 && parseInt(height[0]) <= 193) ||
            (height[1] === 'in' && parseInt(height[0]) >= 59 && parseInt(height[0]) <= 76)
        )
    },
    hcl: (value) => value.match(/^#(?:[0-9a-fA-F]{6}){1,2}$/g),
    ecl: (value) => {
        const match = value.match(/amb|blu|brn|gry|grn|hzl|oth/g);
        return match && match.length > 0;
    },
    pid: (value) => {
        const match = value.match(/^[0-9]+$/g);
        return match && match[0].length == 9;
    }
}

input.forEach(line => {
    if (line.match(/byr:|iyr:|eyr:|hgt:|hcl:|ecl:|pid:/g).length > 6) {
        validLevel1++;
        const kv = [];
        line.split(' ').forEach(value => {
            kv.push(value.split(':'));
        })
        let validFields = 0;
        kv.filter(value => value[0] !== 'cid').forEach(value => {
            validFields += eval(validate[value[0]])(value[1]) ? 1 : 0;
        })
        if (validFields > 6) {
            validLevel2++;
        }
    }
})

console.log(validLevel1);
console.log(validLevel2);

