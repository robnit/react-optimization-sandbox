import React from 'react';
import Pixel from '../Pixel';
import { makeSetter } from '../../utils/row';

import './styles.css';

const PIXELS_PER_ROW = 150;
const INITIAL_ROW = Array(PIXELS_PER_ROW).fill(false);
interface PixelProps {
  isOn: boolean;
  index: number;
  setter: () => void;
}

const areEqual = (prevProps: PixelProps, nextProps: PixelProps) => {
  if (prevProps.setter !== nextProps.setter || prevProps.isOn !== nextProps.isOn) return false;
  return true;
};

const MemoizedPixel = React.memo(({ setter, isOn, index }: PixelProps) => {
  return <Pixel setter={setter} isOn={isOn} key={index} />;
}, areEqual);

const reducer = (state: boolean[], index: number) => {
  if (state[index] === undefined) return state;
  const newRow = [...state];
  newRow[index] = !newRow[index];
  return newRow;
};

function PixelRow() {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_ROW);

  return (
    <div className="row">
      {state.map((isOn, index) => {
        const setter = React.useCallback(() => {
          return makeSetter(dispatch)(index);
        }, []);

        return <MemoizedPixel setter={setter} isOn={isOn} index={index} key={index} />;
      })}
    </div>
  );
}

export default PixelRow;
