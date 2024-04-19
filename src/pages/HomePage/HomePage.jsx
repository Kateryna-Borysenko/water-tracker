import Container from '../../components/common/Container/Container';
import TodayWaterList from '../../components/TodayWater/TodayWaterList/TodayWaterList';
import Calendar from '../../components/Calendar/Calendar';
import Meta from '../../components/common/Meta/Meta';
import bottle from '../../assets/static/image/bottle-home-screen-M-2x.png';
import s from './HomePage.module.css';
import ProgressBar from '../../components/ProgressBarHomePage/ProgressBar';

const HomePage = () => {
  return (
    <>
      <Meta title="Home Page" />
      <div className={s.container}>
        <Container>
          <div className={s.homePageConteiner}>
            <div>
              <div className={s.contentContainer}>
                <img src={bottle} className={s.bottle} alt="Bottle of Water" />
              </div>
              <ProgressBar />
            </div>
            <div className={s.homePageWidgetWrapper}>
              <TodayWaterList />
              <Calendar />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
