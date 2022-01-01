import './styles.css';

function Pixel({ isOn }: { isOn: boolean }) {
  return <div className={`pixel ${isOn ? 'on' : 'off'}`} />;
}

export default Pixel;
