import { System } from "system/system";
import { SystemEvent } from "shared/enums";

export const game = () => {
  let score = 0;
  let globalScore = 0;

  const getScore = () => score;
  const incrementScore = () => {
    score++;
    System.events.emit(SystemEvent.SCORE, { score });
  };
  const setGlobalScore = () => {
    if (score > globalScore) globalScore = score;
    System.events.emit(SystemEvent.GLOBAL_SCORE, { score: globalScore });
    score = 0;
    System.events.emit(SystemEvent.SCORE, { score });
  };

  return {
    getScore,
    incrementScore,
    setGlobalScore,
  };
};
