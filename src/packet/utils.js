export function buildPacketArray(arr) {
  return arr.reduce(
    (acc, cur) => {
      acc.push(cur);
      acc.push("\f");
      return acc;
    },
    ["\f"]
  );
}
