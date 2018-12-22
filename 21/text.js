function main(r0) {
  let r2 = 0;
  let r3 = 0;

  let ct = 0;

  //   while (ct < 1) {
  //     ct++;

  // r5 = r2 | 0x10000;
  //   r5 = 0x10000;

  //   while (r5 >= 256) {
  //     //   r3 = 0;
  //     //   while ((r3 + 1) * 256 <= r5) {
  //     //     r3++;
  //     //   }

  //     r5 = Math.floor(r5 / 256);
  //     //r5 = r3;
  //   }

  //   console.log(r5);
  // r5 = 1;

  r2 = 0xb3 * 0x1016b;
  r2 = r2 & 0xffffff;

  if (r2 === r0) {
    return true;
  }
  //   }

  return false;
}

for (let i = 0; i <= 0xffffff; i++) {
  if (main(i)) {
    console.log(i);
  }
}

// 27029 small
// 11795921 small
// 16777215 hi
