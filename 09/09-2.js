function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function inject(arr, value, index) {
  return arr
    .slice(0, index)
    .concat([value])
    .concat(arr.slice(index));
}

function print(root) {
  let rt = root;
  const result = [];
  while (true) {
    result.push(rt.val);
    rt = rt.next;
    if (rt === root) {
      break;
    }
  }

  console.log(result);
}

function solve(players, max) {
  let root = { val: 0, next: null };
  root.next = root;

  let cur = root;

  let score = Array(players).fill(0);

  for (let nr = 1; nr <= max; nr++) {
    if (nr % 100000 == 0) {
      console.log(nr);
    }

    if (nr % 23 === 0) {
      const player = nr % players;
      score[player] += nr;
      cur = cur.prev.prev.prev.prev.prev.prev.prev;
      score[player] += cur.val;

      cur = cur.next;
      cur.prev = cur.prev.prev;
      cur.prev.next = cur;
    } else {
      cur = cur.next;

      // inject
      const { next } = cur;
      cur.next = { val: nr, next, prev: cur };
      next.prev = cur.next;

      cur = cur.next;
    }

    // print(root);
    // console.log(cur.val);
  }

  return score.reduce((a, b) => Math.max(a, b), 0);
}

assert(solve(7, 25), 32);
assert(solve(10, 1618), 8317);
assert(solve(13, 7999), 146373);
assert(solve(17, 1104), 2764);
assert(solve(21, 6111), 54718);
assert(solve(30, 5807), 37305);

console.log(solve(441, 7103200));
