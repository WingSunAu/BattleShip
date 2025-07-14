import { Ship } from "./Ship";
import { updateBox } from "./DOM";
export function Gameboard(n) {
    // 10x10 grid
    // 0 = not hit
    // 1 = miss
    // 6 = Ship
    // 9 = Hit ship piece
    let player = n;
    let grid = [
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
    let ships = [];
    let sunken = [];
    let hits = [];
    let missed = [];

    // user clicks what kind of ship to place, dom returns the length of that kind of ship
    // user selects if horizontal or vertical placement, dom returns direction
    // x1,y1 = bottom/left point of ship depending on direction
    // 1 4 length ship
    // 2 3 length ships
    // 3 2 length ships
    // 4 1 length ships
    function placeShip({ x1, y1 }, length, direction) {
        if (checkSpace({ x1, y1 }, length, direction)) {
            let shipCoords = [];
            if (direction == "x") {
                for (let i = 0; i < length; i++) {
                    grid[y1][x1 + i] = 6;
                    let x = x1 + i;
                    shipCoords.push([y1, x]);
                    updateBox(player, x1 + i, y1, "6");
                }
            } else {
                for (let i = 0; i < length; i++) {
                    grid[y1 - i][x1] = 6;
                    let y = y1 - i;
                    shipCoords.push([y, x1]);
                    updateBox(player, x1, y1 - i, "6");
                }
            }
            let ship = new Ship(length);
            ships.push({ ship: ship, coords: shipCoords });
            return true;
        }
        return false;
    }
    // O(N) efficiency N = length
    function checkSpace({ x1, y1 }, length, direction) {
        // check space for ship and around ship
        // valid if space around == 0 or off grid
        if (x1 > 9 || x1 < 0 || y1 > 9 || y1 < 0) {
            return false;
        }
        if (direction == "x") {
            // if left of the ship is in range and the value left of the ship are not empty, return false
            if (
                x1 - 1 >= 0 &&
                (grid[y1][x1 - 1] != 0 ||
                    // top left
                    (y1 - 1 >= 0 && grid[y1 - 1][x1 - 1] != 0) ||
                    // bottom left
                    (y1 + 1 <= 9 && grid[y1 + 1][x1 - 1] != 0))
            ) {
                return false;
            }
            // loop and check if ship values and if values around the ship are in range and not empty in which case return false
            for (let i = 0; i < length; i++) {
                // middle
                if (
                    x1 + i > 9 ||
                    grid[y1][x1 + i] != 0 ||
                    // bottom
                    (y1 + 1 <= 9 && grid[y1 + 1][x1 + i] != 0) ||
                    // top
                    (y1 - 1 >= 0 && grid[y1 - 1][x1 + i] != 0)
                ) {
                    return false;
                }
            }
            // if right of the ship is in range and the values right of the ship are not empty, return false
            if (
                x1 + length <= 9 &&
                (grid[y1][x1 + length] != 0 ||
                    // top right
                    (y1 - 1 >= 0 && grid[y1 - 1][x1 + length] != 0) ||
                    // bottom right
                    (y1 + 1 <= 9 && grid[y1 + 1][x1 + length] != 0))
            ) {
                return false;
            }
        } else {
            // if bottom of the ship is in range and the value bottom of the ship are not empty, return false
            if (
                y1 + 1 <= 9 &&
                // bottom
                (grid[y1 + 1][x1] != 0 ||
                    // bottom left
                    (x1 - 1 >= 0 && grid[y1 + 1][x1 - 1] != 0) ||
                    // bottom right
                    (x1 + 1 <= 9 && grid[y1 + 1][x1 + 1] != 0))
            ) {
                return false;
            }
            // loop and check if ship values and if values around the ship are in range and not empty in which case return false
            for (let i = 0; i < length; i++) {
                // middle
                if (
                    y1 - i < 0 ||
                    grid[y1 - i][x1] != 0 ||
                    // right
                    (x1 + 1 <= 9 && grid[y1 - i][x1 + 1] != 0) ||
                    // left
                    (x1 - 1 >= 0 && grid[y1 - i][x1 - 1] != 0)
                ) {
                    return false;
                }
            }
            if (
                y1 - 1 >= 0 &&
                (grid[y1 - 1][x1] != 0 ||
                    // top left
                    (x1 - 1 >= 0 && grid[y1 - 1][x1 - 1] != 0) ||
                    // top right
                    (x1 + 1 <= 9 && grid[y1 - 1][x1 + 1] != 0))
            )
            // if top of the ship is in range and the values top of the ship are not empty, return false
            {
                return false;
            }
        }
        return true;
    }
    function receiveAttack({ x, y }) {
        if (grid[y][x] == 6) {
            grid[y][x] = 9;
            hits.push([y, x]);
            // for each ship loop through the ship's coords
            for (let i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].coords.length; j++) {
                    if (ships[i].coords[j][0] == y && ships[i].coords[j][1] == x) {
                        ships[i].ship.hit();
                        if (ships[i].ship.isSunk()) {
                            sunken.push(ships[i]);
                        }
                    }
                }
            }
            // check if all ships sunken here
            if (isAllSunken()) {
                console.log("all player" + n + "'s ships sunken");
            }
            updateBox(player, x, y, "9");
            return null;
        }
        grid[y][x] = 1;
        missed.push([y, x]);
        updateBox(player, x, y, "1");
        return { x, y };
    }
    function isAllSunken() {
        if (ships.length == sunken.length) {
            return true;
        }
        return false;
    }
    function print() {
        console.log(grid);
    }
    function getGrid() {
        return grid;
    }
    return { placeShip, receiveAttack, isAllSunken, print, getGrid };
}
