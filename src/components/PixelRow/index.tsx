import Pixel from '../Pixel';
import './styles.css';

const PLACEHOLDER_ARRAY = Array(10).fill(false);

function PixelRow() {
  return (
    <div className="row">
      {PLACEHOLDER_ARRAY.map((isOn, i) => (
        <Pixel isOn={isOn} key={`${i}_${isOn}`} />
      ))}
    </div>
  );
}

export default PixelRow;
