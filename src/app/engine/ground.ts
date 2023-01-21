import {Box} from "./box";
import {camera, ctx} from "./canvas";
import {IMAGE} from "./images";
export class Ground extends Box {
  override draw() {
    const pattern = ctx.createPattern(IMAGE['GROUND'] as any, 'repeat')
    ctx.save();
    ctx.fillStyle = '#433E38';
    ctx.fillRect(this.pos[0], this.pos[1] + 5, this.size[0], this.size[1] );
    // ctx.scale(1,-1);
    ctx.fillStyle = pattern as CanvasPattern;
    ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1] );
    ctx.restore();
  }
}
