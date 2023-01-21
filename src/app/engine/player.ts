import {Box, BoxOptions} from "./box";
import {camera, canvas, ctx, getLevelSize} from "./canvas";
import {IMAGE} from "./images";

export interface PlayerOptions extends BoxOptions {

}

export class Player extends Box {
  walkSpeed = 0.012;
  jumpSpeed = -1.42;

  constructor({pos, size, color}: PlayerOptions, type: string = 'Player') {
    super({
      pos,
      size,
      color,
      grav: 0.004,
      friction: 0.2
    }, type);
    this.addControls();
  }

  private addControls() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.acc = this.walkSpeed;
          break;
        case 'ArrowLeft':
          this.acc -= this.walkSpeed;
          break;
        case 'ArrowUp':
          if (this.onGround) {
            this.onGround = false;
            this.vel[1] = this.jumpSpeed;
          }
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.acc = 0;
          break;
        case 'ArrowLeft':
          this.acc = 0;
          break;
        case 'ArrowUp':
          break;
      }
    })
  }

  override draw() {
    ctx.save();
    ctx.drawImage(IMAGE['PLAYER'] as any, this.pos[0], this.pos[1], this.size[0], this.size[1]);
    ctx.restore();
  }

  override push(box: any, objects: any[]) {
    return {
      toLeft: () => {
        if (box.type !== 'Box') return false;
        const distance = box.right - this.left;
        if (box.canBeMoved([-distance, 0], objects)) {
          box.right = this.left;
          return true;
        } else {
          const smallDistance = box.getDistanceToLeftObject(objects);
          if (box.canBeMoved([-smallDistance, 0], objects)) {
            box.left = box.left - smallDistance;
            this.left = box.right;
          }
          return false;
        }

      },
      toRight: () => {
        if (box.type !== 'Box') return false;
        const distance = box.left - this.right;
        if (box.canBeMoved([distance, 0], objects)) {
          box.left = this.right;
          return true;
        } else {
          const smallDistance = box.getDistanceToRightObject(objects);
          if (box.canBeMoved([smallDistance, 0], objects)) {
            box.right = box.right + smallDistance;
            this.right = box.left;
          }
          return false;
        }
      },
    }
  }

  override specificUpdates() {
    super.specificUpdates();
    const [width, height] = getLevelSize();
    camera.pos[0] = Math.max(0, Math.min(width - canvas.width, this.right - canvas.width / 2));
    camera.pos[1] = Math.max(0, Math.min(height - canvas.height, this.top - canvas.height / 2));
  }
}
