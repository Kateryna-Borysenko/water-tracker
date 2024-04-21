import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container/Container';
import MainTitle from '../../components/common/MainTitle/MainTitle';
import Subtitle from '../../components/common/Subtitle/Subtitle';
import Item from '../../components/Item/Item';
import Button from '../../uikit/Button/Button';
import Meta from '../../components/common/Meta/Meta';

import {
  itemArrayBenefits,
  itemArrayOptions,
} from '../../components/Item/itemArrays';

import { useTranslation } from 'react-i18next';

import s from '../WelcomePage/WelcomePage.module.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };
  const { t } = useTranslation();

  const translatedBenefits = itemArrayBenefits.map((item, index) => ({
    svg: item.svg,
    text: t(`WelcomePage.itemArrayBenefits.benefit${index + 1}`),
  }));

  const translatedOptions = itemArrayOptions.map((item, index) =>
    t(`WelcomePage.itemArrayOptions.option${index + 1}`),
  );

  return (
    <div className={s.container}>
      <Meta />
      <Container className="containerWelcomePage">
        <div className={s.contentContainer}>
          <div className={s.itemContainerBenefits}>
            <MainTitle
              title={t('WelcomePage.mainTitle')}
              className="mainTitleWelcomePage"
            />
            <p className={s.slogan}>{t('WelcomePage.slogan')}</p>
            <Subtitle
              title={t('WelcomePage.subtitleBenefits')}
              className="subtitleWelcomePage"
            />
            <Item array={translatedBenefits} className="listItemBenefits" />
            <div className={s.tryTrackerButton}>
              <Button
                onClick={handleClick}
                className="tryTrackerButton"
                title={t('WelcomePage.tryTreckerButton')}
              />
            </div>
          </div>
          <div className={s.itemContainerOptions}>
            <Subtitle
              title={t('WelcomePage.subtitleOptions')}
              className="subtitleWelcomePage"
            />
            <Item array={translatedOptions} className="listItemOptions" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WelcomePage;
