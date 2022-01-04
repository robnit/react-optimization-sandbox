import './styles.css';

interface PixelProps {
  isOn: boolean;
  setter: () => void;
}

function Pixel({ isOn, setter }: PixelProps) {
  return <div onMouseEnter={setter} className={`pixel ${isOn ? 'on' : 'off'}`} />;
}

export default Pixel;
