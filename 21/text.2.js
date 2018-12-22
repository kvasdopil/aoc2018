function main(r0) {
  let r1 = 0,
    r2 = 0,
    r3 = 0,
    idx = 0,
    r5 = 0;
  while (idx >= 0 && idx < 31) {
    switch (idx) {
      case 0:
      case 5:
        r2 = 0;
      case 6:
        r5 = r2 | 65536;
      case 7:
        r2 = 2238642;
      case 8:
        r3 = r5 & 255;
      case 9:
        r2 = r2 + r3;
      case 10:
        r2 = r2 & 16777215;
      case 11:
        r2 = r2 * 65899;
      case 12:
        r2 = r2 & 16777215;
      case 13:
        r3 = 256 > r5 ? 1 : 0;
      case 14:
        idx = 14;
        idx = r3 + idx;
        idx++;
        break;
      case 15:
        idx = 15;
        idx = idx + 1;
        idx++;
        break;
      case 16:
        idx = 16;
        idx = 27;
        idx++;
        break;
      case 17:
        r3 = 0;
      case 18:
        r1 = r3 + 1;
      case 19:
        r1 = r1 * 256;
      case 20:
        r1 = r1 > r5 ? 1 : 0;
      case 21:
        idx = 21;
        idx = r1 + idx;
        idx++;
        break;
      case 22:
        idx = 22;
        idx = idx + 1;
        idx++;
        break;
      case 23:
        idx = 23;
        idx = 25;
        idx++;
        break;
      case 24:
        r3 = r3 + 1;
      case 25:
        idx = 25;
        idx = 17;
        idx++;
        break;
      case 26:
        r5 = r3;
      case 27:
        idx = 27;
        idx = 7;
        idx++;
        break;
      case 28:
        return r2 === r0;
    }
  }
}

for (let i = 11795922; i <= 0xffffff; i++) {
  if (i % 1000000 === 0) {
    console.log("-", i);
  }
  if (main(i)) {
    console.log(i);
  }
}
