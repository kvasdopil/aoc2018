const data = Array(100000000).fill(0);
data[0] = 3;
data[1] = 7;
let a = 0;
let b = 1;
let length = 2;
while (length < 100000000) {
  const sum = data[a] + data[b];

  if (sum >= 10) {
    data[length] = Math.floor(sum / 10);
    length++;
  }
  data[length] = sum % 10;
  length++;

  a = (a + data[a] + 1) % length;
  b = (b + data[b] + 1) % length;
}

function match(a, b, offset) {
  for (let i = 0; i < b.length; i++) {
    if (a[offset + i] != b[i]) {
      return false;
    }
  }
  return true;
}

function find(arr, word) {
  const data = Array.from(word);

  for (let i = 0; i < arr.length - data.length; i++) {
    if (match(arr, data, i)) {
      return i;
    }
  }
  return null;
}

console.log(find(data, "51589"));
console.log(find(data, "01245"));
console.log(find(data, "92510"));
console.log(find(data, "59414"));
console.log(find(data, "047801"));
