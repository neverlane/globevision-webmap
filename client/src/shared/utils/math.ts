export const SA_MAP_SIZE = 6000;

export const minmax = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export const getMapScale = (size: number, gameMapSize: number) => size / gameMapSize;

export const convertMapCoord = (scale: number, coord: { x: number, y: number; }, gameMapSize: number) => ({
  left: `${(scale * minmax(0, coord.x + 3000, gameMapSize))}px`,
  top: `${(scale * minmax(0, 3000 - coord.y, gameMapSize))}px`,
});