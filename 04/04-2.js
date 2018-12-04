const fs = require("fs");

const file = fs
  .readFileSync("./4.txt")
  .toString()
  .split("\n");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parseFile(lines) {
  lines.sort();

  let guard = false;
  let fall = false;
  const result = [];
  while (lines.length) {
    const line = lines
      .shift()
      .replace(":", "")
      .replace("[", "")
      .replace("]", "")
      .split(" ");

    if (line[2] === "Guard") {
      guard = line[3];
      continue;
    }

    if (line[2] === "falls") {
      fall = parseInt(line[1], 00);
      continue;
    }

    if (line[2] == "wakes") {
      result.push({
        guard,
        fall,
        wake: parseInt(line[1], 00)
        // date: line[0]
      });
    }
  }

  return groupByGuards(result);
}

function groupByGuards(items) {
  const result = {};
  for (const item of items) {
    const old = result[item.guard] || [];
    old.push({ fall: item.fall, wake: item.wake });
    result[item.guard] = old;
  }
  return result;
}

function solve(items) {
  const maxMins = [];

  for (const guard in items) {
    const sleeps = items[guard];

    const mins = Array(60).fill(0);
    for (const sleep of sleeps) {
      for (var min = 0; min < 60; min++) {
        if (min >= sleep.fall && min < sleep.wake) {
          mins[min]++;
        }
      }
    }

    const maxVal = mins.reduce((acc, min) => Math.max(acc, min), 0);
    for (const i in mins) {
      if (mins[i] === maxVal) {
        maxMins.push({ guard, i, maxVal });
      }
    }
  }

  const result = maxMins.sort((a, b) => a.maxVal - b.maxVal).pop();
  return result;
}

const data = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.split("\n");

const parsed = parseFile(data);
assert(parsed, {
  "#10": [
    { fall: 5, wake: 25 },
    { fall: 30, wake: 55 },
    { fall: 24, wake: 29 }
  ],
  "#99": [
    { fall: 40, wake: 50 },
    { fall: 36, wake: 46 },
    { fall: 45, wake: 55 }
  ]
});

assert(solve(parsed), { guard: "#99", i: "45", maxVal: 3 });

console.log(solve(parseFile(file)));
