type TweenValueOptions = {
  from: number;
  to: number;
  durationInMilliseconds: number;
  onUpdate: (updatedValue: number) => void;
};

const tweenValue = ({
  from,
  to,
  durationInMilliseconds,
  onUpdate,
}: TweenValueOptions) => {
  const isValueIncreasing = to > from;
  const valueDelta = to - from; // the total 'distance' to cover

  let initialTime: number;

  const update = (timeStamp: number) => {
    if (initialTime === undefined) initialTime = timeStamp;

    const elapsedTime = timeStamp - initialTime;
    const progress = Math.min(elapsedTime / durationInMilliseconds, 1);
    const value = isValueIncreasing
      ? Math.min(from + valueDelta * progress, to)
      : Math.max(from + valueDelta * progress, to);

    onUpdate(value);

    if (value !== to) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

export default tweenValue;
