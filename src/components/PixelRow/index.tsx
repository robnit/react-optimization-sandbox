import React from 'react';
import Pixel from '../Pixel';
import './styles.css';

const INITIAL_ROW = Array(40).fill(false);

const sleep = () => new Promise((resolve) => setTimeout(resolve, 50));

const blink = async (index: number, dispatch: React.Dispatch<number>) => {
  dispatch(index);
  await sleep();
  dispatch(index);
};

async function ripple(index: number, dispatch: React.Dispatch<number>) {
  for (let i = 0; i < 8; ++i) {
    await Promise.all([blink(index - i, dispatch), blink(index + i, dispatch)]);
  }

  return Promise.resolve();
}

function makeSetter (dispatch: React.Dispatch<number>): (i: number) => Promise<void> {
  return async (i: number): Promise<void> => await ripple(i, dispatch);
}

interface PixelProps {
  isOn: boolean;
  key: string;
  setter: () => void;
}

const areEqual = (prevProps: PixelProps, nextProps:PixelProps) => {
  if (prevProps.setter !== nextProps.setter || prevProps.isOn !== nextProps.isOn) return false;
  return true;
};

const MemoizedPixel = React.memo(({ setter, isOn, key }: PixelProps) => {
  return <Pixel setter={setter} isOn={isOn} key={key} />
}, areEqual);

function reducer(state: boolean[], index: number) {
  if (state[index] === undefined) return state;
  const newRow = [...state];
  newRow[index] = !newRow[index];
  return newRow;
}

function PixelRow() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_ROW);

  return (
    <div className="row">
      {state.map((isOn, i) => {
        const setter = React.useCallback(() => {
          const setterFn = makeSetter(dispatch)
          return setterFn(i);
        }, [])

        return <MemoizedPixel setter={setter} isOn={isOn} key={`${i}_${isOn}`} />;
      })}
    </div>
  );
}

export default PixelRow;
