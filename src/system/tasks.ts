import { queue, QueueItemProps, ticker } from "@tu/queue";
import { Event, global } from "@tu/tulip";

export const tasks = () => {
  const $ticker = ticker();
  const $queue = queue({
    onPause: $ticker.pause,
    onResume: $ticker.start,
  });

  const load = () => {
    $ticker.onTick(({ delta }) => $queue.tick(delta));

    global.events.on(Event.VISIBILITY_CHANGE, () => {
      global.window.isVisible() ? $ticker.start() : $ticker.pause();
    });
  };

  const add = (props: QueueItemProps): (() => void) => {
    const id = $queue.add(props);
    return () => $queue.remove(id);
  };

  return {
    load,

    add,
  };
};
