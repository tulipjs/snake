import { PRIMARY_COLOR, SPRITE_SHEET } from "shared/consts";
import {
  textSprite,
  ContainerComponent,
  PartialTextSpriteMutable,
  PartialTextSpriteProps,
} from "@tu/tulip";

export const textComponent: ContainerComponent<
  Omit<PartialTextSpriteProps, "spriteSheet">,
  PartialTextSpriteMutable
> = (props) => {
  const $text = textSprite({
    ...props,
    spriteSheet: SPRITE_SHEET,
    tint: PRIMARY_COLOR,
  });

  return $text.getComponent(textComponent);
};
