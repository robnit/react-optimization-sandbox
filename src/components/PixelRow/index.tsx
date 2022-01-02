import React from 'react';
import Pixel from '../Pixel';
import './styles.css';

const INITIAL_ROW = Array(10).fill(false);

const sleep = () => new Promise((resolve) => setTimeout(resolve, 180));

const blink = async (index: number, dispatch: React.Dispatch<number>) => {
  dispatch(index);
  await sleep();
  dispatch(index);
};
async function ripple(
  index: number,
  dispatch: React.Dispatch<number>,
  row: boolean[]
) {
  const length = Math.abs(index - row.length);
  // await blink(index, dispatch);
  for (let i = 0; i < length; ++i) {
    const promises = [blink(index - i, dispatch), blink(index + i, dispatch)];
    await Promise.all(promises);
  }

  return Promise.resolve();
}

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
        const setter = async () => await ripple(i, dispatch, state);

        return <Pixel setter={setter} isOn={isOn} key={`${i}_${isOn}`} />;
      })}
    </div>
  );
}

export default PixelRow;
