import { Point } from "@tu/tulip";
import { GRID_SIZE } from "shared/consts";

export const getGridIndexPosition = (point: Point): number => {
  let x = point.x;
  let y = point.y;

  if (x > GRID_SIZE.width - 1) x = 0;
  if (y > GRID_SIZE.height - 1) y = 0;

  if (0 > x) x = GRID_SIZE.width - 1;
  if (0 > y) y = GRID_SIZE.height - 1;

  return x * GRID_SIZE.height + y;
};

export const getGridPositionFromIndex = (index: number): Point => {
  let x = Math.floor(index / GRID_SIZE.height);
  let y = index % GRID_SIZE.height;

  if (x > GRID_SIZE.width - 1) x = 0;
  if (y > GRID_SIZE.height - 1) y = 0;

  if (0 > x) x = GRID_SIZE.width - 1;
  if (0 > y) y = GRID_SIZE.height - 1;

  return { x, y };
};
