import React from 'react';
import Pixel from '../Pixel';
import './styles.css';

const PLACEHOLDER_ARRAY = Array(10).fill(false);

function PixelRow() {
  const [row, setRow] = React.useState(PLACEHOLDER_ARRAY);

  return (
    <div className="row">
      {row.map((isOn, i) => {
        const setter = React.useCallback(() => {
          const newRow = [...row];
          newRow[i] = !row[i];
          setRow(newRow);
        }, [row, setRow]);

        return <Pixel setter={setter} isOn={isOn} key={`${i}_${isOn}`} />;
      })}
    </div>
  );
}

export default PixelRow;
