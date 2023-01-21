import {Box} from "./box";
import {camera, canvas, clearCanvas, ctx, getLevelSize} from "./canvas";
import {Ground} from "./ground";
import {IMAGE, preloadImages} from "./images";
import {Player} from "./player";
import {Rectangle} from "./rectangle";
import {timer} from "./timer";

class FlyingGround extends Rectangle{
  override draw() {
    const pattern = ctx.createPattern(IMAGE['GROUND'] as any, 'repeat')
    ctx.save();
    ctx.fillStyle = '#433E38';
    ctx.fillRect(this.pos[0]- camera.pos[0], this.pos[1] + 5 - camera.pos[1], this.size[0], this.size[1] );
    // ctx.scale(1,-1);
    ctx.fillStyle = pattern as CanvasPattern;
    ctx.fillRect(this.pos[0] - camera.pos[0], this.pos[1] - camera.pos[1], this.size[0], this.size[1] );
    ctx.restore();
  }
}

class MovableBox extends Box{
  override draw() {
    const pattern = ctx.createPattern(IMAGE['GROUND'] as any, 'repeat')
    ctx.save();
    ctx.fillStyle = '#433E38';
    ctx.fillRect(this.pos[0]- camera.pos[0], this.pos[1]  - camera.pos[1], this.size[0], this.size[1] );
    // ctx.scale(1,-1);
    ctx.fillStyle = pattern as CanvasPattern;
    ctx.fillRect(this.pos[0] - camera.pos[0], this.pos[1] - camera.pos[1], this.size[0], this.size[1] );
    ctx.restore();
  }
}

export const render = () => {
  const r = new FlyingGround({pos: [600, canvas.height - 200], size: [300, 30], color: 'blue'});
  const r3 = new FlyingGround({pos: [1000, canvas.height - 400], size: [300, 30], color: 'blue'});
  const r4 = new FlyingGround({pos: [1400, canvas.height - 690], size: [200, 50], color: 'blue'});
  const r2 = new FlyingGround({pos: [100, canvas.height- 100], size: [10, 100], color: 'purple'});
  const ground = new Ground({pos: [0, canvas.height - 50], size: [ getLevelSize()[0], 52], color: 'purple'});
  const b = new MovableBox({pos: [1000, canvas.height- 800], size: [40, 80], color: 'green'});
  const player = new Player({pos: [15, 15], size: [50, 70], color: 'magenta'});

  // player.draw();
  // player.vel = [0.2, -0.3];

  const objects: any[] = [r,
    new FlyingGround({pos: [250, canvas.height - 320], size: [200, 30], color: 'blue'}),
    new FlyingGround({pos: [600, canvas.height - 500], size: [200, 30], color: 'blue'}),
    new FlyingGround({pos: [300, canvas.height - 650], size: [200, 30], color: 'blue'}),
    new FlyingGround({pos: [700, canvas.height - 800], size: [200, 30], color: 'blue'}),
    new FlyingGround({pos: [350, canvas.height - 950], size: [200, 30], color: 'blue'}),
    new FlyingGround({pos: [800, canvas.height - 1100], size: [10000, 30], color: 'blue'}),
    new MovableBox({pos: [300, canvas.height- 800], size: [40, 40], color: 'green'}),
    new MovableBox({pos: [260, canvas.height- 800], size: [40, 40], color: 'green'}),
    new MovableBox({pos: [160, canvas.height- 800], size: [40, 40], color: 'green'}),
    new MovableBox({pos: [1060, canvas.height- 800], size: [40, 40], color: 'green'}),
    r3, r4, r2, ground, b, player, /*player, b, ground*/];

  timer.update = (deltaTime: number) => {
    clearCanvas();
    objects.forEach(obj => obj.update(deltaTime, objects))
    objects.forEach(obj => obj.draw())
  }

  timer.start();
}


window.addEventListener("gamepadconnected", (e) => {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

document.addEventListener('keydown', (event) => {
  console.log(event.key);
  if(event.key === 'Escape') {
    window.location.reload();
  }
})
