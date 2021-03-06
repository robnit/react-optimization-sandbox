import './styles.css';
import PixelRow from './components/PixelRow';

const ROW_QUANTITY = 150;

export const App = () => {
  return (
    <div className="main">
      <div className="title">๐ move cursor here๐</div>
      {Array(ROW_QUANTITY)
        .fill(undefined)
        .map((_, i) => (
          <PixelRow key={i} />
        ))}
    </div>
  );
};
