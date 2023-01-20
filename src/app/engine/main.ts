import {Box} from "./box";
import {clearCanvas} from "./canvas";
import {Rectangle} from "./rectangle";
import {timer} from "./timer";

export const render = () => {
  const r = new Rectangle({pos: [10, 10], size: [300, 50], color: 'red'});
  r.draw();

  const r2 = new Rectangle({pos: [15, 15], size: [30, 20], color: 'green'});
  r2.draw();


  console.log(r.overlapsWith(r2))
  const b1 = new Box({pos: [15, 15], size: [50, 50], color: 'blue'});
  b1.draw();

  b1.vel = [0.2, -0.3];

  timer.update = (deltaTime: number) => {
    clearCanvas();
    b1.update(deltaTime);
    b1.draw();
  }

  timer.start();

  window.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowDown'){

      }
  })
}
