import './styles.css';
import PixelRow from './components/PixelRow';

const ROW_QUANTITY = 150;

export const App = () => {
  return (
    <div className="main">
      <div className="title">👇 move cursor here👇</div>
      {Array(ROW_QUANTITY)
        .fill(undefined)
        .map((_, i) => (
          <PixelRow key={i} />
        ))}
    </div>
  );
};
