import {Box} from "./box";
import {canvas, clearCanvas, getLevelSize} from "./canvas";
import {Player} from "./player";
import {Rectangle} from "./rectangle";
import {timer} from "./timer";

export const render = () => {
  const r = new Rectangle({pos: [400, canvas.height - 200], size: [300, 10], color: 'blue'});
  const r3 = new Rectangle({pos: [800, canvas.height - 400], size: [300, 10], color: 'blue'});
  const r4 = new Rectangle({pos: [1200, canvas.height - 700], size: [300, 10], color: 'blue'});
  const r2 = new Rectangle({pos: [200, canvas.height- 100], size: [10, 100], color: 'purple'});
  const ground = new Rectangle({pos: [0, canvas.height - 40], size: [ getLevelSize()[0], 40], color: 'purple'});
  const b = new Box({pos: [800, canvas.height- 800], size: [40, 80], color: 'green'});
  const player = new Player({pos: [15, 15], size: [50, 50], color: 'magenta'});

  // player.draw();
  // player.vel = [0.2, -0.3];

  const objects: any[] = [r,r3, r4, r2, player, b, ground];

  timer.update = (deltaTime: number) => {
    clearCanvas();
    objects.forEach(obj => obj.update(deltaTime, objects))
    objects.forEach(obj => obj.draw())
  }

  timer.start();
}
