import {readFileSync} from 'fs';

let validLevel1 = 0, validLevel2 = 0,
    validHeight = {
        cm: (value: number) => value >= 150 && value <= 193,
        in: (value: number) => value >= 59 && value <= 76,
    },
    validate = {
        byr: (value: number) => value >= 1920 && value <= 2002,
        iyr: (value: number) => value >= 2010 && value <= 2020,
        eyr: (value: number) => value >= 2020 && value <= 2030,
        hgt: value => {
            const hgt = value.match(/[a-zA-Z]{2}|[0-9]+/g);
            return hgt[1] && validHeight[hgt[1]](hgt[0]);
        },
        hcl: value => value.match(/^#(?:[0-9a-fA-F]{6})/),
        ecl: value => value.match(/amb|blu|brn|gry|grn|hzl|oth/),
        pid: value => value.match(/^[0-9]{9}$/)
    }

readFileSync('./04/aoc04-input.txt', 'utf-8')
    .trimEnd().replace(/\n/g, ' ').split('  ')
    .filter(line => line.match(/byr:|iyr:|eyr:|hgt:|hcl:|ecl:|pid:/g).length === 7)
    .forEach(line => {
        let validFields = 0;
        line
            .split(' ').map(v => v.split(':')).filter(v => v[0] !== 'cid')
            .forEach(v => validFields += validate[v[0]](v[1]) ? 1 : 0)
        validLevel1++;
        validLevel2 += validFields === 7 ? 1 : 0;
    })

console.log(validLevel1, validLevel2);
