function main(r0) {
  let r2 = 0;
  let r3 = 0;

  let ct = 0;

  while (ct < 10000) {
    ct++;
    // if (ct % 1000 === 0) {
    //   console.log(r0, ct);
    // }

    r5 = r2 | 65536;
    r2 = 2238642;

    while (true) {
      r2 = (r2 + r5) & 255;
      r2 = r2 & 16777215;
      r2 = r2 * 65899;
      r2 = r2 & 16777215;
      if (256 > r5) {
        break;
      }
      r3 = 0;
      while ((r3 + 1) * 256 <= r5) {
        r3++;
      }
      r5 = r3;
    }

    if (r2 === r0) {
      return [r0, r2, r3];
    }
  }
}

for (let i = 0; i < 1000; i++) {
  console.log(i);
  main(i);
}
