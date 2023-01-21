export const IMAGE = {
  PLAYER: null,
  RED_BIRD: null,
  WHITE_BIRD: null,
  TILEMAP: null,
  CLOUDS: null,
  GROUND: null,
};

const sources = [
  { name: 'GROUND', src: "./assets/ground.png" },
  { name: 'PLAYER', src: "./assets/player.png" }
];

export function preloadImages(callbackFunction: () => void) {
  function preloadImage(i: number) {
    if (i < sources.length) {
      const img = new Image();
      img.onload = () => {
        preloadImage(i + 1);
      };
      // @ts-ignore
      IMAGE[sources[i].name] = img;
      img.src = sources[i].src;
    } else {
      callbackFunction();
    }
  }
  preloadImage(0);
}
