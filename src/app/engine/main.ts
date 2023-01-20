import {Box} from "./box";
import {canvas, clearCanvas} from "./canvas";
import {Player} from "./player";
import {Rectangle} from "./rectangle";
import {timer} from "./timer";

export const render = () => {
  const r = new Rectangle({pos: [400, canvas.height - 200], size: [300, 60], color: 'blue'});
  const r2 = new Rectangle({pos: [200, canvas.height- 100], size: [10, 100], color: 'purple'});
  const player = new Player({pos: [15, 15], size: [50, 50], color: 'magenta'});

  // player.draw();
  // player.vel = [0.2, -0.3];

  const objects: any[] = [r, r2, player];

  timer.update = (deltaTime: number) => {
    clearCanvas();
    objects.forEach(obj => obj.update(deltaTime, objects))
    objects.forEach(obj => obj.draw())
  }

  timer.start();
}
