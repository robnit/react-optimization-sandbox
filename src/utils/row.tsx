
export const sleep = (sleepytime: number) => new Promise((resolve) => setTimeout(resolve, sleepytime));

export const blink = async (index: number, dispatch: React.Dispatch<number>) => {
  dispatch(index);
  await sleep(50);
  dispatch(index);
};

export const ripple = async (index: number, dispatch: React.Dispatch<number>) => {
  for (let i = 0; i < 22; ++i) {
    await Promise.all([blink(index - i, dispatch), blink(index + i, dispatch)]);
  }
  return Promise.resolve();
};

type Setter = (index: number) => Promise<void>;
export const makeSetter = (dispatch: React.Dispatch<number>): Setter => {
  return async (index: number) => await ripple(index, dispatch);
};
