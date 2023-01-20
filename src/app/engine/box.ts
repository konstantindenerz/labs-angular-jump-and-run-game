import {getLevelSize} from "./canvas";
import {Rectangle, RectangleOptions} from "./rectangle";

export interface BoxOptions extends RectangleOptions {

}

export class Box extends Rectangle {
  public grav: number;
  public friction: number;
  public vel: [number, number];
  public acc: number;
  public onGround: boolean;

  constructor(options: BoxOptions) {
    super(options);
    this.grav = 0.005;
    this.friction = 0;
    this.vel = [0, 0]; //velocity
    this.acc = 0; // acceleration
    this.onGround = false;
  }

  update(deltaTime: number) {
    this.vel[0] += this.acc * deltaTime;
    this.vel[0] *= (1 - this.friction);
    this.vel[1] += this.grav * deltaTime;
    this.pos[0] += this.vel[0] * deltaTime;
    this.pos[1] += this.vel[1] * deltaTime;
    this.onGround = false;
    this.boundToLevel();
  }

  private boundToLevel() {
    const [width, height]=  getLevelSize();
    if(this.bottom >= height){
        this.vel[1] = 0;
        this.bottom = height;
        this.onGround=  true;
    }
    if(this.left <= 0)
    {
      this.left = 0;
      this.vel[0] =0;
    }else if(this.right >= width){
      this.right = width;
      this.vel[0] = 0;
    }
  }
}
