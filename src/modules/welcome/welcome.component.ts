import { container, sprite } from "@tu/tulip";
import { PRIMARY_COLOR, SPRITE_SHEET } from "shared/consts";

export const welcomeComponent = () => {
  const $container = container();

  const $sprite = sprite({
    spriteSheet: SPRITE_SHEET,
    texture: "welcome",
    tint: PRIMARY_COLOR,
  });
  $container.add($sprite);

  return $container.getComponent(welcomeComponent);
};
