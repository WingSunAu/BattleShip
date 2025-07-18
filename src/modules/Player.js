import { Gameboard } from "./Gameboard";
export function Player(n, computer) {
    let order = n;
    let isComputer = computer;
    let board = new Gameboard(n);
    let getBoard = () => board;
    let getOrder = () => order;
    return { getBoard, getOrder };
}
