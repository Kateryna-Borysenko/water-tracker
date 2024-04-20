import Container from '../../components/common/Container/Container';
import MyDailyNorma from '../../components/MyDailyNorma/MyDailyNorma';
import TodayWaterList from '../../components/TodayWater/TodayWaterList/TodayWaterList';
import Calendar from '../../components/Calendar/Calendar';
import Meta from '../../components/common/Meta/Meta';
import ProgressBar from '../../components/ProgressBarHomePage/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectWaterPortionsToday } from '../../redux/water/watersSelectors';
import { useEffect } from 'react';
import { apiGetWaterPortionToday } from '../../redux/water/watersOperations';
import s from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetWaterPortionToday());
  }, [dispatch]);

  return (
    <>
      <Meta title="Home Page" />
      <div className={s.container}>
        <Container>
          <div className={s.homePageConteiner}>
            <div>
              <div className={s.contentContainer}>
                <MyDailyNorma />
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
