import { Ship } from "./Ship";
export function Gameboard() {
    // 10x10 grid
    // 0 = not hit
    // 1 = hit
    // 6 = Ship
    // 9 = Hit ship piece
    this.grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    // array of objects representing coordinates
    this.ships = [];
    this.sunken = [];
    this.hits = [];
    this.missed = [];
    // user clicks what kind of ship to place, dom returns the length of that kind of ship 
    // user selects if horizontal or vertical placement, dom returns direction
    // x1,y1 = bottom/left point of ship depending on direction
    function placeShip({ x1, y1 }, length, direction) {
        if (checkSpace({ x1, y1 }, length, direction)) {
            let shipCoords = [];
            if (direction == "x") {
                for (let i = 0; i < length; i++) {
                    this.grid[y1][x1 + i] = 6;
                    let x = x1 + i;
                    shipCoords.push([y1, x]);
                }
            } else {
                for (let i = 0; i < length; i++) {
                    this.grid[y1 + i][x1] = 6;
                    let y = y1 + i;
                    shipCoords.push([y, x1]);
                }
            }
            let ship = new Ship();
            this.ships.push({ ship: ship, coords: shipCoords });
        }
    };
    // O(N) efficiency N = length
    function checkSpace({ x1, y1 }, length, direction) {
        // check space for ship and around ship
        // valid if space around == 0 or off grid
        if (x1 > 9 || x1 < 0 || y1 > 9 || y1 < 0) {
            return false;
        }
        if (direction == "x") {
            // middle left
            if (this.grid[y1][x1 - 1] == 6
                // top left
                || this.grid[y1 - 1][x1 - 1] == 6
                // bottom left
                || this.grid[y1 + 1][x1 - 1] == 6) {
                return false;
            }
            for (let i = 0; i < length; i++) {
                // middle and if out of grid
                if (this.grid[y1][x1 + i] == 6
                    || x1 + i > 9
                    // might run into issues with checking off grid values if you cant compare undefined
                    // bottom
                    || this.grid[y1 + 1][x1] == 6
                    // top
                    || this.grid[y1 - 1][x1] == 6
                ) {
                    return false;
                }
            }
        } else {
            // middle bottom
            if (this.grid[y1 + 1][x1] == 6
                // left bottom
                || this.grid[y1 + 1][x1 - 1] == 6
                // right bottom
                || this.grid[y1 + 1][x1 + 1] == 6) {
                return false;
            }
            for (let i = 0; i < length; i++) {
                // middle and if out of grid
                if (this.grid[y1 + i][x1] == 6
                    || x1 + i > 9
                    // might run into issues with checking off grid values if you cant compare undefined
                    // left
                    || this.grid[y1][x1 - 1] == 6
                    // right
                    || this.grid[y1][x1 + 1] == 6
                ) {
                    return false;
                }
            }
        }
        return true;
    };
    function receiveAttack({ x, y }) {
        if (this.grid[y][x] == 6) {
            this.grid[y][x] = 9;
            for (let i = 0; i < this.ships.length; i++) {
                if (this.ships[i].coords[1] == x && this.ships[i].coords[2] == y) {
                    this.ships[i].ship.hit();
                }
            }
            return null;
        }
        return { x, y };
    };
    function isAllSunken() {
        if (this.ships.length == this.sunken.length) {
            return true;
        }
        return false;
    };
    return { placeShip, receiveAttack, isAllSunken };
};