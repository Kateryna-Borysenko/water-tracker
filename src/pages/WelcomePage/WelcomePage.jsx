import Container from '../../components/common/Container/Container';

import Meta from '../../components/common/Meta/Meta';
import s from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={s.container}>
      <Meta />
      <Container>
        <div>Welcome to Water Tracker App</div>
      </Container>
    </div>
  );
};

export default WelcomePage;
