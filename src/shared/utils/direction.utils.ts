import { Direction } from "shared/enums";
import { Point } from "@tu/tulip";

export const getDirectionFromKey = (key: string): Direction => {
  switch (key) {
    case "arrowdown":
    case "s":
      return Direction.DOWN;
    case "arrowup":
    case "w":
      return Direction.UP;
    case "arrowright":
    case "d":
      return Direction.RIGHT;
    case "arrowleft":
    case "a":
      return Direction.LEFT;
  }
};

export const getPositionFromDirection = (direction: Direction): Point => {
  switch (direction) {
    case Direction.DOWN:
      return { x: 0, y: 1 };
    case Direction.UP:
      return { x: 0, y: -1 };
    case Direction.RIGHT:
      return { x: 1, y: 0 };
    case Direction.LEFT:
      return { x: -1, y: 0 };
  }
};

export const canMoveToDirection = (
  currentDirection: Direction,
  targetDirection: Direction,
): boolean => {
  switch (currentDirection) {
    case Direction.DOWN:
    case Direction.UP:
      return (
        targetDirection === Direction.LEFT ||
        targetDirection === Direction.RIGHT
      );
    case Direction.RIGHT:
    case Direction.LEFT:
      return (
        targetDirection === Direction.DOWN || targetDirection === Direction.UP
      );
  }
};
