import { container } from "@tu/tulip";
import { welcomeComponent } from "modules/welcome";
import { gameComponent } from "modules/game";

export const appComponent = () => {
  const $container = container();

  const $welcome = welcomeComponent();
  const $game = gameComponent();

  $container.add($welcome);

  setTimeout(() => {
    $container.add($game);
    $container.remove($welcome);
  }, 3000);

  return $container.getComponent(appComponent);
};
