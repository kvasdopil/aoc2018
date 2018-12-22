function main() {
  let r2 = 0,
    r3 = 0,
    r5 = 0;

  let results = Array(0xffffff).fill(0);

  let retries = 0;
  while (true) {
    retries++;
    r5 = r2 | 65536;
    r2 = 2238642;

    while (true) {
      r3 = r5 & 255;
      r2 = r2 + r3;
      r2 = r2 & 0xffffff;
      r2 = r2 * 65899;
      r2 = r2 & 0xffffff;

      if (256 > r5) {
        break;
      }

      r5 = (r5 - (r5 % 256)) / 256;
    }

    const r = results[r2];
    if (r === 0) {
      results[r2] = retries;
      console.log(retries, r2);
    }
  }
}

main(0);
