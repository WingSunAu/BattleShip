// use this as your entry point
import "./styles.css";
import { Player } from "./modules/Player";
import { render, switchTurns } from "./modules/DOM";

let p1 = new Player(1, false);
let p2 = new Player(2, false);
render(p1.getBoard().getGrid(), p1, p1.getBoard().receiveAttack);
render(p2.getBoard().getGrid(), p2, p2.getBoard().receiveAttack);

switchTurns(p1, p2);
switchTurns(p2, p1);
p1.getBoard().print();


// be wary this. gets undefined in higher order functions