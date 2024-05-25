const withTimeGuard = (
  callback: () => void,
  frequencyInMilliseconds: number
) => {
  let timeElapsedSinceLastInvocation = 0;

  return (delta: number) => {
    timeElapsedSinceLastInvocation += delta;

    if (timeElapsedSinceLastInvocation > frequencyInMilliseconds) {
      callback();
      timeElapsedSinceLastInvocation = 0;
    }
  };
};

export default withTimeGuard;
