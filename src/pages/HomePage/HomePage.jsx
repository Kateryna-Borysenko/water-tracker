import Container from '../../components/common/Container/Container';
import Calendar from '../../components/Calendar/Calendar';
import Meta from '../../components/common/Meta/Meta';
import bottle from '../../assets/static/image/bottle-home-screen-M-2x.png';
import s from './HomePage.module.css';
import ProgressBar from '../../components/ProgressBarHomePage/ProgressBar';

//temporary code:
import { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import SettingCard from '../../components/SettingCard/SettingCard';

const HomePage = () => {
  //temporary code:
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(true); //false

  const handleCloseSettingModal = () => {
    setIsOpenSettingModal(false);
  };
  return (
    <>
      <Meta title="Home Page" />
      <div className={s.container}>
        <Container>
          <div className={s.homePageConteiner}>
            <div className={s.contentContainer}>
              <img src={bottle} className={s.bottle} alt="Bottle of Water" />
            </div>
            <ProgressBar />
            <div className={s.homePageWidgetWrapper}>
              <Calendar />
            </div>
          </div>
          {/* temporary code: */}
          {isOpenSettingModal && (
            <Modal onClose={handleCloseSettingModal} className="setting-card">
              <SettingCard></SettingCard>
            </Modal>
          )}
        </Container>
      </div>
    </>
  );
};

export default HomePage;
