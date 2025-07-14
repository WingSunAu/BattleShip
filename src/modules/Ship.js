export function Ship(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    function hit() {
        this.hits++;
    };
    function isSunk() {
        if (this.hits == length) {
            this.sunk = true;
        }
        return this.sunk;
    };
    return { hit, isSunk };
};