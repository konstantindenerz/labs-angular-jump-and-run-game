import {Box, BoxOptions} from "./box";

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
}
