export function render(arr, player, callBack) {
    let grid = document.getElementById("grid" + player.getOrder());
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.id = player.getOrder() + "" + j + "" + i;
            box.textContent = i + "" + j;
            box.addEventListener("click", () => {
                callBack({ x: j, y: i });
                if (player.getOrder() == 1) {
                    switchTurns(2, 1);
                } else {
                    switchTurns(1, 2);
                }
            })
            grid.appendChild(box);
        }
    }
}
export function updateBox(player, x, y, text) {
    let box = document.getElementById(player + "" + x + "" + y);
    // box.textContent = text;
    if (text == "6") {
        box.classList.add("ship");
    } else if (text == "9") {
        box.classList.add("sunken")
    } else if (text == "1") {
        box.classList.add("miss");
    }
}
// make it so p1 can fire but p2 cant
export function switchTurns(player1, player2) {
    let p1 = document.querySelectorAll('[id^="' + player1 + '"]');
    for (let i = 0; i < p1.length; i++) {
        p1[i].classList.remove("notPlaying");
    }
    let p2 = document.querySelectorAll('[id^="' + player2 + '"]');
    for (let i = 0; i < p2.length; i++) {
        p2[i].classList.add("notPlaying");
    }
}