// use this as your entry point
import "./styles.css";
import { Player } from "./modules/Player";
import { render, switchTurns } from "./modules/DOM";

let p1 = new Player(1, false);
let p2 = new Player(2, false);
render(p1.getBoard().getGrid(), p1, p1.getBoard().receiveAttack, p2);
render(p2.getBoard().getGrid(), p2, p2.getBoard().receiveAttack, p1);
// cover opponenets board's ships on player move, 
// end game when one side's ships sunken
// allow player to change ship placement via a randomize button that clears their ships and replaces them with the auto place function
switchTurns(p2.getOrder(), p1.getOrder());
p1.getBoard().print();
p1.getBoard().autoPlace();
p2.getBoard().autoPlace();
// be wary this. gets undefined in higher order functions