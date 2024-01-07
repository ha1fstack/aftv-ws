export function buildPacketArray(arr) {
  return ["\f", ...arr.join("\f"), "\f"];
}
