import { global } from "@tu/tulip";
import { SPRITE_SHEET } from "shared/consts";
import { events } from "system/events";
import { game } from "system/game";
import { tasks } from "system/tasks";

export const System = (() => {
  const $tasks = tasks();

  const load = async () => {
    await global.spriteSheets.load({
      spriteSheet: [SPRITE_SHEET],
      onLoad: async (spriteSheet) => {
        console.log(`${performance.now()} Loading... ${spriteSheet}`);
      },
    });
    $tasks.load();
  };

  return {
    load,

    game: game(),
    events: events(),
    tasks: $tasks,
  };
})();
