import { container, sprite } from "@tu/tulip";
import { PRIMARY_COLOR, SCREEN_SIZE, SPRITE_SHEET } from "shared/consts";

export const gameOverComponent = () => {
  const $container = container();

  const $sprite = sprite({
    spriteSheet: SPRITE_SHEET,
    texture: "game-over",
    tint: PRIMARY_COLOR,
  });
  $container.add($sprite);

  $container.setPosition({
    x: SCREEN_SIZE.width / 2 - $sprite.getBounds().width / 2,
    y: $sprite.getBounds().height / 2 + 3,
  });

  return $container.getComponent(gameOverComponent);
};
