import {camera, ctx} from "./canvas";

export interface RectangleOptions {
  pos: [number, number];
  size: [number, number];
  color: string;
}

export class Rectangle {
  public pos: [number, number];
  public size: [number, number];
  public color: string;

  constructor(options: RectangleOptions, public type = 'Rectangle') {
    this.pos = options.pos;
    this.size = options.size;
    this.color = options.color;
  }

  get left() {
    return this.pos[0];
  }

  get right() {
    return this.pos[0] + this.size[0];
  }

  get top() {
    return this.pos[1];
  }

  get bottom() {
    return this.pos[1] + this.size[1];
  }

  set left(value: number) {
    this.pos[0] = value;
  }

  set right(value: number) {
    this.pos[0] = value - this.size[0];
  }

  set top(value: number) {
    this.pos[1] = value;
  }

  set bottom(value: number) {
    this.pos[1] = value - this.size[1];
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0] - camera.pos[0], this.pos[1] - camera.pos[1], this.size[0], this.size[1])
  }

  overlapsWith(obj: Rectangle, offset = [0, 0]): boolean {
    if (this === obj) return false;
    return (
      this.left + offset[0] < obj.right &&
      this.right + offset[0] > obj.left &&
      this.bottom + offset[1] > obj.top &&
      this.top + offset[1] < obj.bottom
    )
  }

  update(deltaTime: number) {

  }
}
