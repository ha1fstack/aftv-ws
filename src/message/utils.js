import { FLAG } from "../const/flag.js";

export function getColor(rawColor) {
  if (isNaN(rawColor) || rawColor === 0) return null;
  const c = rawColor.toString(16).padStart(6, "0").toUpperCase();
  return `#${c.slice(4, 6)}${c.slice(2, 4)}${c.slice(0, 2)}`;
}

export function getFlags(flag1, flag2) {
  const flags = [];

  Object.entries(FLAG).forEach(([flag, data]) => {
    const { where, value } = data;
    const flagBinary = where === 1 ? flag1 : flag2;

    if (flagBinary & value) flags.push(flag);
  });

  return flags;
}
