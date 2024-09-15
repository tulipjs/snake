import {
  container,
  DisplayObjectEvent,
  HorizontalAlign,
  sprite,
} from "@tu/tulip";
import { PRIMARY_COLOR, SCREEN_SIZE, SPRITE_SHEET } from "shared/consts";
import { textComponent } from "shared/components";
import { System } from "system";
import { SystemEvent } from "shared/enums";
import { gridComponent } from "modules/game/grid.component";
import { gameOverComponent } from "modules/game-over";

export const gameComponent = () => {
  const $container = container();

  const $base = sprite({
    spriteSheet: SPRITE_SHEET,
    texture: "game",
    tint: PRIMARY_COLOR,
  });
  const $score = textComponent({
    text: "0",
    horizontalAlign: HorizontalAlign.LEFT,
    position: {
      x: 1,
      y: 2,
    },
  });
  const $globalScore = textComponent({
    text: "0",
    horizontalAlign: HorizontalAlign.RIGHT,
    position: {
      x: 0,
      y: 2,
    },
    size: {
      width: SCREEN_SIZE.width - 1,
      height: 6,
    },
  });

  let $grid = gridComponent();
  let $gameOver = gameOverComponent();

  $container.add($base, $score, $globalScore, $grid);

  let removeOnScoreEvent;
  let removeOnGlobalScoreEvent;
  $container.on(DisplayObjectEvent.MOUNT, () => {
    removeOnScoreEvent = System.events.on(SystemEvent.SCORE, ({ score }) => {
      $score.setText(`${score}`);
    });
    removeOnGlobalScoreEvent = System.events.on(
      SystemEvent.GLOBAL_SCORE,
      ({ score }) => {
        $globalScore.setText(`${score}`);
        $container.add($gameOver);
        $container.remove($grid);

        setTimeout(() => {
          $container.add($grid);
          $container.remove($gameOver);
        }, 5_000);
      },
    );
  });
  $container.on(DisplayObjectEvent.UNMOUNT, () => {
    removeOnScoreEvent();
    removeOnGlobalScoreEvent();
  });

  return $container.getComponent(gameComponent);
};
