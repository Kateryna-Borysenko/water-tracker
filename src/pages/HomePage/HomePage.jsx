import Container from '../../components/common/Container/Container';
import MyDailyNorma from '../../components/MyDailyNorma/MyDailyNorma';
import TodayWaterList from '../../components/TodayWater/TodayWaterList/TodayWaterList';
import Calendar from '../../components/Calendar/Calendar';
import Meta from '../../components/common/Meta/Meta';
import ProgressBar from '../../components/ProgressBarHomePage/ProgressBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { apiGetWaterPortionToday } from '../../redux/water/watersOperations';
import s from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetWaterPortionToday());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Meta title="Home Page" />
        <Container className="containerHomePage">
          <div className={s.contentContainer}>
            <MyDailyNorma />
            <ProgressBar />
          </div>
          <div className={s.homePageWidgetWrapper}>
            <TodayWaterList />
            <Calendar />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
