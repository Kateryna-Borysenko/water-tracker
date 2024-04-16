import { Slider } from 'antd';
import Container from '../common/Container/Container';
import Button from '../../uikit/Button/Button';
import Icons from '../Icons/Icons';
import s from './ProgressBar.module.css';

const marks = {
  0: '0%',
  50: '50%',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100%</strong>,
  },
};

const ProgressBar = () => {
  return (
    <Container>
      <div>
        <p className={s.textProgresBar}>Today</p>
        <Slider marks={marks} value={37} />
        <Button title={'Add Water'} className={s.buttonProgresBar}>
          <Icons id={'plus-circle'} stroke={'#fff'} size={'24'} />
        </Button>
      </div>
    </Container>
  );
};

export default ProgressBar;
