// use this as your entry point
import "./styles.css";
import { Player } from "./modules/Player";
import { render, switchTurns } from "./modules/DOM";

let p1 = new Player(1, false);
let p2 = new Player(2, true);
render(p1.getBoard().getGrid(), p1, p1.getBoard().receiveAttack, p2);
render(p2.getBoard().getGrid(), p2, p2.getBoard().receiveAttack, p1);
// cover opponenet's board's ships on player move, 
// end game when one side's ships sunken
// allow player to change ship placement via a randomize button that clears their ships and replaces them with the auto place function

p1.getBoard().print();

p1.getBoard().autoPlace();
p2.getBoard().autoPlace();
switchTurns(p2, p1);


// be wary this. gets undefined in higher order functions