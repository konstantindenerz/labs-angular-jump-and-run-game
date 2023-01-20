export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth  ;
canvas.height = window.innerHeight;
export const ctx = canvas.getContext('2d')!;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

export const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const getLevelSize = () => {
  return [canvas.width * 3, canvas.height];
}

export const camera = {
  pos: [0, 0],
}
