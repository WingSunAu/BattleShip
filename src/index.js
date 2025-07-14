// use this as your entry point
import "./styles.css";
import { Player } from "./modules/Player";
import { render, updateBox } from "./modules/DOM";

let p1 = new Player(1, false);
let p2 = new Player(2, false);
render(p1.getBoard().getGrid(), 1);
render(p2.getBoard().getGrid(), 2);



p1.getBoard().placeShip({ x1: 0, y1: 0 }, 2, "x");
p1.getBoard().placeShip({ x1: 0, y1: 0 }, 2, "y");
p1.getBoard().placeShip({ x1: 9, y1: 9 }, 2, "y");
p1.getBoard().receiveAttack({ x: 0, y: 0 });
p1.getBoard().receiveAttack({ x: 1, y: 0 });
p1.getBoard().receiveAttack({ x: 9, y: 9 });
p1.getBoard().receiveAttack({ x: 9, y: 8 });
p1.getBoard().print();
// be wary this. gets undefined in higher order functions

// cant read nonexistent/off grid values, add cases to if statements to check