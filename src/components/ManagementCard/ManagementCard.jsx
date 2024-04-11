import s from './ManagementCard.module.css';

const ManagementCard = ({ title, description, secondButton, className }) => {
  const buttonContainerClassNames = `${s.title} ${s[className]}`;
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <h2 className={s.description}>{description}</h2>
      <div className={buttonContainerClassNames}>
        <button className={s.firstButton}>Cancel</button>
        <button className={s.secondButton}>{secondButton}</button>
      </div>
    </div>
  );
};

export default ManagementCard;
