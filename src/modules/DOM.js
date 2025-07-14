export function render(arr, player) {
    let grid = document.getElementById("grid" + player);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.textContent = "0";
            grid.appendChild(box);
        }
    }
}