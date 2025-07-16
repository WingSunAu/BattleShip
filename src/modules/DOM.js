export function render(arr, player, callBack, opp) {
    let grid = document.getElementById("grid" + player.getOrder());
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.id = player.getOrder() + "" + j + "" + i;
            box.textContent = i + "" + j;
            box.addEventListener("click", () => {
                // if square already attacked, do nothing
                if (player.getBoard().checkAttackValid({ x: j, y: i })) {
                    callBack({ x: j, y: i });
                    // check if other player is cpu 
                    // if so, make other player take turn immediately
                    if (player.getIsComputer()) {
                        player.getBoard().autoMove(opp);
                    }
                    // dont switch turns if opponent is cpu
                    if (!(opp.getIsComputer() || player.getIsComputer())) {
                        switchTurns(opp, player);
                    }
                } else {
                    console.log("invalid move!")
                }
            })
            grid.appendChild(box);
        }
    }
}
export function updateBox(player, x, y, text) {
    let box = document.getElementById(player + "" + x + "" + y);
    box.textContent = text;
    if (text == "6") {
        box.classList.add("ship");
    } else if (text == "9") {
        box.classList.add("sunken")
    } else if (text == "1") {
        box.classList.add("miss");
    }
}
// works in a weird way.
export function switchTurns(player1, player2) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let box = document.getElementById(player1.getOrder() + "" + j + "" + i);
            box.classList.remove("notPlaying");
            if (player1.getBoard().getGrid()[i][j] == 6) {
                box.classList.remove("ship");
            }
        }
    }
    for (let k = 0; k < 10; k++) {
        for (let l = 0; l < 10; l++) {
            let box = document.getElementById(player2.getOrder() + "" + l + "" + k);
            box.classList.add("notPlaying");
            if (player2.getBoard().getGrid()[k][l] == 6) {
                box.classList.add("ship");
            }
        }
    }
}

export function endGame() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let box = document.getElementById(1 + "" + j + "" + i);
            box.classList.add("notPlaying");
        }
    }
    for (let k = 0; k < 10; k++) {
        for (let l = 0; l < 10; l++) {
            let box = document.getElementById(2 + "" + l + "" + k);
            box.classList.add("notPlaying");
        }
    }
}