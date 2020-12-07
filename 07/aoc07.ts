import {readFileSync} from 'fs';

const rules = readFileSync('./07/aoc07-input.txt', 'utf-8').trimEnd()
    .replace(/ bags| bag|\./g, '').replace(/no other/g, '0 no other')
    .split('\n').map(rule => {
        const row = rule.split(' contain ');
        return {
            bag: row[0],
            rules: row[1].split(',').map(value => {
                const splitted = value.trim().split(' ');
                return {
                    count: parseInt(splitted[0]),
                    bag: splitted[1] + ' ' + splitted [2]
                }
            })
        }
    })

function whereToLook(bag, set: Set<string>): Set<string> {
    rules.forEach(rule => {
        rule.rules.filter(rule => rule.bag === bag).forEach(unused => {
            set.add(rule.bag);
            whereToLook(rule.bag, set);
        })
    })
    return set;
}

const feelTheWeight = (bag, count: number, multiplier) =>
    rules.filter(rule => rule.bag === bag).reduce((count, rule) =>
        rule.rules.filter(rule => rule.count > 0)
            .reduce((count: number, rule) =>
                feelTheWeight(rule.bag, count + rule.count * multiplier, rule.count * multiplier), count), count);


const bag = 'shiny gold'; // of
console.log(whereToLook(bag, new Set()).size, feelTheWeight(bag, 0, 1));
