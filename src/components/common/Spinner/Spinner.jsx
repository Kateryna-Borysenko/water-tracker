import { BeatLoader } from 'react-spinners';

const Spinner = ({ color = '#fff', size = 12 }) => {
  return <BeatLoader color={color} size={size} aria-label="Loading Spinner" />;
};

export default Spinner;
