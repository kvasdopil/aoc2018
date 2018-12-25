function parse(line) {
  const data = line.split(/[\(\)]/g);

  const d0 = data[0].split(" ");
  const d2 = data[2].split(" ");

  let feats = {};

  data[1]
    .split(";")
    .map(i => i.trim(i))
    .map(i => i.split(" "))
    .forEach(arr => {
      const name = arr.shift();
      arr.shift();
      arr.forEach(val => (feats[val.replace(",", "")] = name));
      // feats[arr] = res;
    });

  return {
    side: d0[0],
    units: parseInt(d0[1], 10),
    hp: parseInt(d0[5], 10),
    attack: parseInt(d2[6], 10),
    damage: d2[7],
    init: parseInt(d2[11], 10),
    ...feats
  };
}

function calcDamage(from, to) {
  if (to.side[0] === from.side[0]) {
    return 0;
  }

  if (from.units <= 0) {
    return 0;
  }

  if (to.units <= 0) {
    return 0;
  }

  const weak = to[from.damage] === "weak";
  const immune = to[from.damage] === "immune";

  if (immune) {
    return 0;
  }

  const dmg = from.units * from.attack;
  return weak ? dmg * 2 : dmg;
}

function solve(input, boost) {
  input.forEach(i => {
    if (i.side[0] === "i") {
      i.attack += boost;
    }
  });

  input.sort((a, b) => b.init - a.init);

  while (true) {
    input.sort((a, b) => {
      const p2 = b.units * b.attack;
      const p1 = a.units * a.attack;
      if (p1 === p2) {
        return b.init - a.init;
      }

      return p2 - p1;
    });

    const selected = {};

    const targets = input
      .filter(group => group.units > 0)
      .map(group => {
        const damages = input
          .filter(i => !selected[i.init])
          .map(g => ({
            from: group.init,
            to: g.init,
            power: g.units * g.attack,
            dmg: calcDamage(group, g)
          }));

        damages.sort((a, b) => {
          if (a.dmg === b.dmg) {
            if (a.power === b.power) {
              return a.to - b.to;
            }
            return a.power - b.power;
          }
          return a.dmg - b.dmg;
        });
        const hit = damages.pop();

        if (hit.dmg) {
          selected[hit.to] = true;
        }

        return hit;
      })
      .filter(a => a.dmg > 0);

    targets.sort((a, b) => b.from - a.from);

    if (targets.length === 0) {
      break;
    }

    targets.map(attack => {
      const target = input.reduce((a, b) => (b.init === attack.to ? b : a));
      const source = input.reduce((a, b) => (b.init === attack.from ? b : a));
      const kill = Math.floor(calcDamage(source, target) / target.hp);
      // console.log(source.side, target.side, attack.dmg, "kill", kill);
      target.units -= kill;
    });

    // input
    //   .filter(i => i.units > 0)
    //   .forEach(group => console.log(group.side, group.init, group.units));
  }

  const result = input
    .filter(i => i.units > 0)
    .filter(i => i.side[0] === "i")
    .reduce((res, a) => res + a.units, 0);

  return result;
}

const testInput = [
  "i1 17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2",
  "i2 989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3",
  "b1 801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1",
  "b2 4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4"
].map(parse);
console.log(solve(testInput, 1570));

const realInput = [
  "i1 197 units each with 6697 hit points (weak to bludgeoning, fire) with an attack that does 312 slashing damage at initiative 3",
  "i2 3803 units each with 8760 hit points (weak to bludgeoning) with an attack that does 21 slashing damage at initiative 9",
  "i3 5279 units each with 4712 hit points () with an attack that does 8 cold damage at initiative 7",
  "i4 3727 units each with 11858 hit points (weak to slashing) with an attack that does 25 cold damage at initiative 19",
  "i5 494 units each with 3486 hit points (weak to radiation; immune to bludgeoning) with an attack that does 70 cold damage at initiative 6",
  "i6 1700 units each with 8138 hit points (weak to slashing) with an attack that does 41 slashing damage at initiative 18",
  "i7 251 units each with 4061 hit points (weak to bludgeoning) with an attack that does 157 radiation damage at initiative 15",
  "i8 87 units each with 1699 hit points () with an attack that does 161 cold damage at initiative 11",
  "i9 1518 units each with 9528 hit points (weak to cold, slashing) with an attack that does 60 slashing damage at initiative 2",
  "i10 347 units each with 6624 hit points (immune to fire; weak to bludgeoning) with an attack that does 148 slashing damage at initiative 12",

  "b1 6929 units each with 51693 hit points () with an attack that does 13 slashing damage at initiative 5",
  "b2 1638 units each with 32400 hit points (weak to bludgeoning) with an attack that does 27 bludgeoning damage at initiative 16",
  "b3 2311 units each with 12377 hit points (weak to fire; immune to cold) with an attack that does 9 slashing damage at initiative 8",
  "b4 685 units each with 29080 hit points (weak to bludgeoning, fire; immune to radiation) with an attack that does 57 bludgeoning damage at initiative 10",
  "b5 1225 units each with 7657 hit points (weak to slashing) with an attack that does 12 cold damage at initiative 14",
  "b6 734 units each with 52884 hit points () with an attack that does 102 bludgeoning damage at initiative 13",
  "b7 608 units each with 49797 hit points (weak to radiation; immune to slashing) with an attack that does 162 bludgeoning damage at initiative 1",
  "b8 3434 units each with 49977 hit points () with an attack that does 28 radiation damage at initiative 4",
  "b9 1918 units each with 14567 hit points (weak to slashing) with an attack that does 13 bludgeoning damage at initiative 20",
  "b10 519 units each with 18413 hit points (immune to slashing) with an attack that does 69 fire damage at initiative 17"
];

for (let b = 1000; b > 1; b--) {
  const input = realInput.map(parse);
  console.log(b, solve(input, b));
}
