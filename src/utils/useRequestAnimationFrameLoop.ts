const useRequestAnimationFrameLoop = (
  callback: (delta: number) => void,
  immediate: boolean = true
) => {
  let id: ReturnType<typeof requestAnimationFrame> | undefined;
  let previousTimeStamp: number | undefined;

  const loop = (timeStamp: number) => {
    if (previousTimeStamp === undefined) previousTimeStamp = timeStamp;

    const delta = timeStamp - previousTimeStamp;
    callback(delta);
    previousTimeStamp = timeStamp;
    id = requestAnimationFrame(loop);
  };

  const start = () => {
    id = requestAnimationFrame(loop);
  };

  const stop = () => {
    if (!id) return;
    cancelAnimationFrame(id);
    id = undefined;
    previousTimeStamp = undefined;
  };

  if (immediate) start();

  return { start, stop };
};

export default useRequestAnimationFrameLoop;
