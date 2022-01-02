import React from 'react';
import Pixel from '../Pixel';
import './styles.css';

const INITIAL_ROW = Array(10).fill(false);

async function ripple(index: number, dispatch: React.Dispatch<number>) {
  dispatch(index);
  await new Promise(resolve => setTimeout(resolve, 1000));
  dispatch(index + 1);
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
        const setter = async () => await ripple(i, dispatch);

        return <Pixel setter={setter} isOn={isOn} key={`${i}_${isOn}`} />;
      })}
    </div>
  );
}

export default PixelRow;
