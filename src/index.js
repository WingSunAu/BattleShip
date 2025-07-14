// use this as your entry point
import "./styles.css";
import { Player } from "./modules/Player";
import { render } from "./modules/DOM";
let p1 = new Player();
let p2 = new Player();
p1.getBoard().placeShip({ x1: 0, y1: 0 }, 2, "x");
p1.getBoard().print();

render(p1.getBoard().getGrid(), 1);
render(p2.getBoard().getGrid(), 2);
p1.getBoard().print();
// be wary this. gets undefined in higher order functions

// cant read nonexistent/off grid values, add cases to if statements to check