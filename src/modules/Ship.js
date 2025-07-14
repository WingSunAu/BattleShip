export function Ship(len) {
  let length = len;
  let hits = 0;
  let sunk = false;
  function hit() {
    hits++;
  }
  function isSunk() {
    if (hits == length) {
      sunk = true;
    }
    return sunk;
  }
  return { hit, isSunk };
}
