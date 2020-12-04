import {readFileSync} from 'fs';

const input = readFileSync('./04/aoc04-input.txt', 'utf-8')
    .trimEnd().replace(/\n/g, ' ').split('  ');

let validLevel1 = 0, validLevel2 = 0;

let validHeight = {
    cm: (value: number) => value >= 150 && value <= 193,
    in: (value: number) => value >= 59 && value <= 76,
}

let validate = {
    byr: (value: number) => value >= 1920 && value <= 2002,
    iyr: (value: number) => value >= 2010 && value <= 2020,
    eyr: (value: number) => value >= 2020 && value <= 2030,
    hgt: value => {
        const height = value.match(/[a-zA-Z]{2}|[0-9]+/g);
        return height[1] && validHeight[height[1]](parseInt(height[0]));
    },
    hcl: (value) => value.match(/^#(?:[0-9a-fA-F]{6})/),
    ecl: (value) => value.match(/amb|blu|brn|gry|grn|hzl|oth/),
    pid: (value) => value.match(/^[0-9]{9}$/)
}

input.forEach(line => {
    if (line.match(/byr:|iyr:|eyr:|hgt:|hcl:|ecl:|pid:/g).length > 6) {
        validLevel1++;
        const kv = [];
        line.split(' ').forEach(value => {
            kv.push(value.split(':'));
        })
        let validFields = 0;
        kv.filter(value => value[0] !== 'cid').forEach(value => validFields += validate[value[0]](value[1]) ? 1 : 0)
        if (validFields > 6) {
            validLevel2++;
        }
    }
})

console.log(validLevel1);
console.log(validLevel2);
