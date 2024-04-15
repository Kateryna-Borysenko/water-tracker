import Container from '../../components/common/Container/Container';

import AddAndEditWaterCard from '../../components/AddWaterModal/AddAndEditWaterCard';

import Meta from '../../components/common/Meta/Meta';
import s from './WelcomePage.module.css';
import Modal from '../../components/common/Modal/Modal';
// import ManagementCarg from '../../components/ManagementCard/ManagementCard';

const WelcomePage = () => {
  return (
    <div className={s.container}>
      <AddAndEditWaterCard />

      {/* <Modal>
        <ManagementCarg
          title="title"
          description="description"
          secondButton="delete"
          // className="aligntRight"
        />
      </Modal> */}
      <Meta />
      <Container>
        <div>Welcome to Water Tracker App</div>
      </Container>
    </div>
  );
};

export default WelcomePage;
