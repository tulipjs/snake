import { application } from "@tu/tulip";
import { System } from "system";
import { appComponent } from "modules/app";
import { BACKGROUND_COLOR, SCREEN_SIZE } from "shared/consts";

const app = application({
  backgroundColor: BACKGROUND_COLOR,
  scale: 8,
  pixelPerfect: true,
  showFPS: false,
  //@ts-ignore
  importMetaEnv: import.meta.env,
  //@ts-ignore
  importMetaHot: import.meta.hot,
  safeArea: false,
  resize: false,
  width: SCREEN_SIZE.width,
  height: SCREEN_SIZE.height,
});

app.load(async () => {
  await System.load();
  app.add(appComponent());
});
