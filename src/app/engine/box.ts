import {getLevelSize} from "./canvas";
import {Rectangle, RectangleOptions} from "./rectangle";

export interface BoxOptions extends RectangleOptions {
  grav?: number;
  friction?: number;
  vel?: [number, number];
  acc?: number;

}

export class Box extends Rectangle {
  public grav: number;
  public friction: number;
  public vel: [number, number];
  public acc: number;
  public onGround: boolean;
  private ppos: number[];

  get prevLeft() {
    return this.ppos[0];
  }

  get prevRight() {
    return this.ppos[0] + this.size[0];
  }

  get prevTop() {
    return this.ppos[1];
  }

  get prevBottom() {
    return this.ppos[1] + this.size[1];
  }


  constructor({pos, size, color, grav, friction, vel, acc}: BoxOptions, type: string = 'Box') {
    super({pos, size, color}, type);
    this.grav = grav ?? 0.005;
    this.friction = friction ?? 0;
    this.vel = vel ?? [0, 0]; //velocity
    this.acc = acc ?? 0; // acceleration
    this.onGround = false;
    this.ppos = [...this.pos] // previous position
  }

  applyPhysics(deltaTime: number) {
    this.vel[0] += this.acc * deltaTime;
    this.vel[0] *= (1 - this.friction);
    this.vel[1] += this.grav * deltaTime;
    this.pos[0] += this.vel[0] * deltaTime;
    this.pos[1] += this.vel[1] * deltaTime;
    this.onGround = false;

  }

  override update(deltaTime: number, objects?: Rectangle[]) {
    this.ppos = [...this.pos];
    this.applyPhysics(deltaTime);
    if (objects !== undefined) {
      objects.forEach(obj => {
        this.collideWith(obj, objects).fromAbove();
        this.collideWith(obj, objects).fromBelow();
        this.collideWith(obj, objects).fromLeft();
        this.collideWith(obj, objects).fromRight();
      })
    }
    this.boundToLevel();
    this.specificUpdates();
  }

  push(obj: any, objects: any[] = []) {
    return {
      toLeft: () => false,
      toRight: () => false,
    }
  }

  private collideWith(obj: Rectangle, objects: any[]) {
    return {
      fromAbove: () => {
        if (this.prevBottom <= obj.top && this.overlapsWith(obj)) {
          this.bottom = obj.top;
          this.vel[1] = 0;
          this.onGround = true;
        }
      },
      fromLeft: () => {
        if (this.prevRight <= obj.left && this.overlapsWith(obj)) {
          if (this.push(obj, objects).toRight()) return;
          this.right = obj.left;
          this.vel[0] = 0;
        }
      },
      fromBelow: () => {
        if (this.prevTop >= obj.bottom && this.overlapsWith(obj)) {
          this.top = obj.bottom;
          this.vel[1] = 0;
        }
      },
      fromRight: () => {
        if (this.prevLeft >= obj.right && this.overlapsWith(obj)) {
          if (this.push(obj, objects).toLeft()) return;
          this.left = obj.right;
          this.vel[0] = 0;
        }
      }
    }
  }

  private boundToLevel() {
    const [width, height] = getLevelSize();
    if (this.bottom >= height) {
      this.vel[1] = 0;
      this.bottom = height;
      this.onGround = true;
    }
    if (this.left <= 0) {
      this.left = 0;
      this.vel[0] = 0;
    } else if (this.right >= width) {
      this.right = width;
      this.vel[0] = 0;
    }
  }

  canBeMoved(offset: [number, number], objects: any[]) {
    const [width, height] = getLevelSize();

    if (this.left + offset[0] < 0 ||
      this.right + offset[0] > width ||
      this.top + offset[1] < 0 ||
      this.bottom + offset[1] > height) {
      return false;
    }
    return objects.filter(obj => obj.type === 'Rectangle' || obj.type === 'Box').every(obj => !this.overlapsWith(obj, offset))
  }


  getDistanceToRightObject(objects: any[]) {
    const [width, height] = getLevelSize();
    let d = width - this.right;
    objects.filter(obj => obj.type === 'Rectangle' || obj.type === "Box").forEach(obj => {
      if (this.right <= obj.left && this.bottom > obj.top && this.top < obj.bottom) {
        d = Math.min(d, obj.left - this.right)
      }
    });
    return d;
  }


  getDistanceToLeftObject(objects: any[]) {
    const [width, height] = getLevelSize();
    let d = width - this.left;
    objects.filter(obj => obj.type === 'Rectangle' || obj.type === "Box").forEach(obj => {
      if (this.left >= obj.right && this.bottom > obj.top && this.top < obj.bottom) {
        d = Math.min(d, this.left - obj.right)
      }
    });
    return d;
  }

  public specificUpdates() {

  }
}
