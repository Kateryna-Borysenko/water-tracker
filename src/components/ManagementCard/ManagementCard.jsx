import { useTranslation } from 'react-i18next';
import s from './ManagementCard.module.css';
import Spinner from '../common/Spinner/Spinner';

const ManagementCard = ({
  title,
  description,
  secondButton,
  className,
  onClick,
  onClickCancelBtn,
  disabledYesBtn,
  loading,
}) => {
  const buttonContainerClassNames = `${s.title} ${s[className]}`;
  const { t } = useTranslation();
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <h2 className={s.description}>{description}</h2>
      <div className={buttonContainerClassNames}>
        <button onClick={onClickCancelBtn} className={s.firstButton}>
          {t('managementCard.cancelButton')}
        </button>
        <button
          onClick={onClick}
          className={s.secondButton}
          disabled={disabledYesBtn}
        >
          {loading && <Spinner color="#fff" size="10px" />}
          {!loading && secondButton}
        </button>
      </div>
    </div>
  );
};

export default ManagementCard;
