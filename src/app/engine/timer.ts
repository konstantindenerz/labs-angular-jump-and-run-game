export class Timer {
  deltaTime: number;
  lastTime: number | null;
  accumulatedTime: number;
  paused: boolean;

  constructor(deltaTime: number) {
    this.lastTime = null;
    this.deltaTime = deltaTime;
    this.accumulatedTime = 0;
    this.paused = true;
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(currentTime: number) {
    if (this.lastTime !== null) {
      this.accumulatedTime += currentTime - this.lastTime;
      if (this.accumulatedTime > 1000) {
        this.accumulatedTime = 1000;
      }
      while (this.accumulatedTime > this.deltaTime) {
        this.update(this.deltaTime);
        this.accumulatedTime -= this.deltaTime;
      }

    }
    this.lastTime = currentTime;
    this.start();
  }

  update(deltaTime: number): void {

  }

  pause() {
    this.lastTime = null;
    this.paused = true;

  }
}

export const timer = new Timer(1000 / 60);
