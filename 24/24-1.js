const testInput = [
  "17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2",
  "989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3",
  "801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1",
  "4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4"
].map(parse);

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
    units: parseInt(d0[0], 10),
    hp: parseInt(d0[4], 10),
    attack: parseInt(d2[6], 10),
    damage: d2[7],
    init: parseInt(d2[11], 10),
    ...feats
  };
}

testInput.map(i => console.log(i));
