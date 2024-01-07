export function createPacket(_head, _tail) {
  const head = makeBuffer(_tail);
  const body = makeBuffer(makeHeader(_head, head.byteLength, 0));
  return mergePacket(body, head);
}

function makeHeader(packetCode, byteLength, r) {
  return [
    "\u001b",
    "\t",
    packetCode.toString().padStart(4, "0"),
    byteLength.toString().padStart(6, "0"),
    r.toString().padStart(2, "0"),
  ];
}

const encoder = new TextEncoder();
function makeBuffer(e) {
  return encoder.encode(e.join(""));
}

function mergePacket(body, header) {
  const packet = new Uint8Array(body.byteLength + header.byteLength);
  packet.set(body);
  packet.set(header, body.byteLength);
  return packet.buffer;
}
