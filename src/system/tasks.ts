import { queue, ticker, QueueItemProps } from "@tu/queue";

export const tasks = () => {
  const $ticker = ticker();
  const $queue = queue({
    onPause: $ticker.pause,
    onResume: $ticker.start,
  });

  const load = () => {
    $ticker.onTick(({ delta }) => $queue.tick(delta));
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
