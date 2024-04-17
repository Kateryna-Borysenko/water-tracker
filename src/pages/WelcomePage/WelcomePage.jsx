import Container from '../../components/common/Container/Container';
import MainTitle from '../../components/common/MainTitle/MainTitle';
import Subtitle from '../../components/common/Subtitle/Subtitle';
import Item from '../../components/Item/Item';
import Button from '../../uikit/Button/Button';
import Meta from '../../components/common/Meta/Meta';

import {
  itemArrayBenefits,
  itemArrOptions,
} from '../../components/Item/itemArrays';

import s from '../WelcomePage/WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={s.container}>
      <Meta />

      <Container className={s.containerWelcomePage}>
        <div className={s.contentContainer}>
          <div className={s.itemContainerBenefits}>
            <MainTitle
              title="Water consumption tracker"
              className="mainTitleWelcomePage"
            />
            <p className={s.slogan}>Record daily water intake and track</p>
            <Subtitle
              title="Tracker Benefits"
              className="subtitleWelcomePage"
            />
            <Item array={itemArrayBenefits} className="listItemBenefits" />
            <div className={s.tryTrackerButton}>
              <Button className="tryTrackerButton" title="Try tracker" />
            </div>
          </div>
          <div className={s.itemContainerOptions}>
            <Subtitle title="Why drink water" className="subtitleWelcomePage" />
            <Item array={itemArrOptions} className="listItemOptions" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WelcomePage;
