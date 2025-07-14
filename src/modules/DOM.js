export function render(arr, player) {
    let grid = document.getElementById("grid" + player);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.id = player + "" + j + "" + i;
            box.textContent = "0";
            grid.appendChild(box);
        }
    }
}
export function updateBox(player, x, y, text) {
    let box = document.getElementById(player + "" + x + "" + y);
    box.textContent = text;
    box.classList.add("ship");
}
