import Container from '../../components/common/Container/Container';
import Calendar from '../../components/Calendar/Calendar';
import Meta from '../../components/common/Meta/Meta';
import Modal from '../../components/common/Modal/Modal';
import AddAndEditWaterCard from '../../components/AddWaterModal/AddAndEditWaterCard';
import bottle from '../../assets/static/image/bottle-home-screen-M-2x.png';
import s from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <Meta title="Home Page" />
      <div className={s.container}>
        <Container>
          <div className={s.homePageConteiner}>
            <div className={s.contentContainer}>
              <img src={bottle} className={s.bottle} alt="Bottle of Water" />
            </div>
            <div className={s.homePageWidgetWrapper}>
              <Calendar />
            </div>
          </div>
        </Container>
        <Modal>
          <AddAndEditWaterCard />
        </Modal>
      </div>
    </>
  );
};

export default HomePage;
