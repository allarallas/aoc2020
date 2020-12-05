import {readFileSync} from 'fs';

let validLevel1 = 0, validLevel2 = 0,
    validHeight = {
        cm: v => v >= 150 && v <= 193,
        in: v => v >= 59 && v <= 76,
    },
    validate = {
        byr: v => v >= 1920 && v <= 2002,
        iyr: v => v >= 2010 && v <= 2020,
        eyr: v => v >= 2020 && v <= 2030,
        hgt: v => {
            const hgt = v.match(/[a-zA-Z]{2}|[0-9]+/g);
            return hgt[1] && validHeight[hgt[1]](hgt[0]);
        },
        hcl: v => v.match(/^#(?:[0-9a-fA-F]{6})/),
        ecl: v => v.match(/amb|blu|brn|gry|grn|hzl|oth/),
        pid: v => v.match(/^[0-9]{9}$/)
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
