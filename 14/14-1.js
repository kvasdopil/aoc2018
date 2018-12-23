const data = [3, 7];
let a = 0;
let b = 1;
while (data.length < 100000) {
  const sum = data[a] + data[b];

  if (sum >= 10) {
    data.push(Math.floor(sum / 10));
  }
  data.push(sum % 10);

  a = (a + data[a] + 1) % data.length;
  b = (b + data[b] + 1) % data.length;

  // console.log(data);
}

console.log(data.slice(9, 9 + 10).join(""));
console.log(data.slice(5, 5 + 10).join(""));
console.log(data.slice(18, 18 + 10).join(""));
console.log(data.slice(2018, 2018 + 10).join(""));

console.log(data.slice(47801, 47801 + 10).join(""));
