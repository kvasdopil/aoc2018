let r0 = 0,
  r1 = 0,
  r2 = 0,
  r3 = 0,
  idx = 0,
  r5 = 0,
  r6 = 0;
while (idx >= 0 && idx < 31) {
  switch (idx) {
    case 0:
      r2 = 123;
    case 1:
      r2 = r2 & 456;
      r2 = r2 === 72 ? 1 : 0;
      idx = r2 === 1 ? 5 : 1;
      continue;
    case 5:
      r2 = 0;
    case 6:
      r5 = r2 | 65536;
      r2 = 2238642;
    case 8:
      r3 = r5 & 255;
      r2 = r2 + r3;
      r2 = r2 & 16777215;
      r2 = r2 * 65899;
      r2 = r2 & 16777215;
      r3 = 256 > r5 ? 1 : 0;
      if (r3 === 1) {
        if (r2 === r0) {
          console.log(r0, r1, r2, r3, idx, r5, r6);
          process.exit();
        }
        idx = 6;
        continue;
      } else {
        r3 = 0;
        while ((r3 + 1) * 256 <= r5) {
          r3++;
        }
        r5 = r3;
        idx = 8;
        continue;
      }
  }
}
console.log(r0, r1, r2, r3, idx, r5, r6);
