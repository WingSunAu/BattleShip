import { Gameboard } from "./Gameboard";
export function Player() {
    let board = new Gameboard();
    let getBoard = () => board;
    return { getBoard }
}