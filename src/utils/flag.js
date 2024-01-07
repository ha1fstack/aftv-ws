import { FLAG } from "../const/flag.js";

export function getFlags(flag1, flag2) {
  const flags = [];

  Object.entries(FLAG).forEach(([flag, data]) => {
    const { where, value } = data;
    const flagBinary = where === 1 ? flag1 : flag2;

    if (flagBinary & value) flags.push(flag);
  });

  return flags;
}

// const flagEntries = Object.entries(FLAG);
// function getFlagById(flagId) {
//   return flagEntries.find(([key]) => key === flagId)[1];
// }
// const { value, where } = getFlagById(flagId);

export class Flag {
  flag1 = 0;
  flag2 = 0;

  add(flag) {
    const { value, where } = flag;

    if (where === 1) this.flag1 |= value;
    else this.flag2 |= value;

    return this;
  }

  sub(flag) {
    const { value, where } = flag;

    if (where === 1) this.flag1 &= ~value;
    else this.flag2 &= ~value;

    return this;
  }

  get flag1() {
    return this.flag1.toString();
  }

  get flag2() {
    return this.flag2.toString();
  }
}
