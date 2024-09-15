import {
  container,
  DisplayObjectEvent,
  Event,
  global,
  graphics,
  GraphicType,
  sprite,
} from "@tu/tulip";
import {
  BACKGROUND_COLOR,
  GRID_LENGTH,
  GRID_SIZE,
  PRIMARY_COLOR,
  SPRITE_SHEET,
} from "shared/consts";
import { System } from "system";
import { TickerQueue } from "@tu/queue";
import {
  canMoveToDirection,
  getDirectionFromKey,
  getGridIndexPosition,
  getGridPositionFromIndex,
  getPositionFromDirection,
  getRandomNumber,
  getTimeFromAppleCount,
} from "shared/utils";
import { Direction } from "shared/enums";

export const gridComponent = () => {
  const $container = container({
    position: {
      x: 1,
      y: 9,
    },
  });
  const bg = graphics({
    type: GraphicType.RECTANGLE,
    width: GRID_SIZE.width * 2,
    height: GRID_SIZE.height * 2,
    tint: BACKGROUND_COLOR,
  });
  $container.add(bg);

  let $dotsContainer = container();
  $container.add($dotsContainer);

  let snake: number[];

  const $generateNewApple = () => {
    const targetIndex = getRandomNumber(0, GRID_LENGTH);
    if (snake.includes(targetIndex)) return $generateNewApple();
    return targetIndex;
  };
  let apple: number;

  let direction: Direction;
  let isActionDone;
  let removeTaskRepeat;
  let removeOnKeyDown;

  const $render = () => {
    const lastDots = $dotsContainer.getChildren();
    let dotList = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
      if (!snake.includes(i) && apple !== i) continue;

      const position = getGridPositionFromIndex(i);
      const $dot = sprite({
        spriteSheet: SPRITE_SHEET,
        texture: "dot",
        tint: PRIMARY_COLOR,
        position: {
          x: position.x * 2,
          y: position.y * 2,
        },
      });
      dotList.push($dot);
    }
    $dotsContainer.remove(...lastDots);
    $dotsContainer.add(...dotList);
    for (const dot of lastDots) dot.$destroy();
    isActionDone = true;
  };

  let appleCount;
  let timeAppleCount;

  const $tick = () => {
    const targetPos = getPositionFromDirection(direction);
    const currentPosition = getGridPositionFromIndex(snake[0]);
    const targetPosition = {
      x: currentPosition.x + targetPos.x,
      y: currentPosition.y + targetPos.y,
    };
    const targetIndex = getGridIndexPosition(targetPosition);
    if (snake.includes(targetIndex)) {
      System.game.setGlobalScore();
      removeTaskRepeat();
      return false;
    }

    snake = [getGridIndexPosition(targetPosition), ...snake];

    if (apple === targetIndex) {
      System.game.incrementScore();
      apple = $generateNewApple();
      appleCount++;

      const targetTime = getTimeFromAppleCount(appleCount);
      if (targetTime !== timeAppleCount) {
        timeAppleCount = targetTime;
        removeTaskRepeat();
        removeTaskRepeat = System.tasks.add({
          type: TickerQueue.REPEAT,
          repeatEvery: timeAppleCount,
          repeats: Number.MAX_SAFE_INTEGER,
          onFunc: $tick,
        });
      }
    } else {
      snake.pop();
    }

    $render();
  };

  $container.on(DisplayObjectEvent.MOUNT, () => {
    const initialPosition = {
      x: Math.floor(GRID_SIZE.width / 2),
      y: Math.floor(GRID_SIZE.height / 2),
    };
    snake = [
      getGridIndexPosition({
        ...initialPosition,
        x: initialPosition.x + 2,
      }),
      getGridIndexPosition({
        ...initialPosition,
        x: initialPosition.x + 1,
      }),
      getGridIndexPosition(initialPosition),
    ];
    apple = $generateNewApple();
    appleCount = 0;
    timeAppleCount = getTimeFromAppleCount(appleCount);
    direction = Direction.RIGHT;
    isActionDone = true;

    $render();
    removeTaskRepeat = System.tasks.add({
      type: TickerQueue.REPEAT,
      repeatEvery: timeAppleCount,
      repeats: Number.MAX_SAFE_INTEGER,
      onFunc: $tick,
    });
    removeOnKeyDown = global.events.on(Event.KEY_DOWN, ({ key }) => {
      if (!isActionDone) return;

      const targetDirection = getDirectionFromKey(key.toLowerCase());
      if (!canMoveToDirection(direction, targetDirection)) return;
      direction = targetDirection;
      isActionDone = false;
    });
  });
  $container.on(DisplayObjectEvent.UNMOUNT, () => {
    $dotsContainer.remove(...$dotsContainer.getChildren());
    removeTaskRepeat();
    removeOnKeyDown();
  });

  return $container.getComponent(gridComponent);
};
