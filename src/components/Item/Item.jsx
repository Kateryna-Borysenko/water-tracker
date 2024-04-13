import iconCalendar from '../../assets/static/calendar.svg';
import iconChart from '../../assets/static/chart.svg';
import iconTools from '../../assets/static/tools.svg';

import s from './Item.module.css';

const itemArrOptions = [
  {
    svg: iconCalendar,
    text: 'Habit drive',
  },
  {
    svg: iconChart,
    text: 'View statistics',
  },
  {
    svg: iconTools,
    text: 'Personal rate setting',
  },
];

const itemArrayBenefits = [
  'Supply of nutrients to all organs',
  'Providing oxygen to the lungs',
  'Maintaining the work of the heart',
  'Release of processed substances',
  'Ensuring the stability of the internal environment',
  'Maintaining within the normal temperature',
  'Maintaining an immune system capable of resisting disease',
];

const Item = () => {
  return (
    <div className={s.itemContainer}>
      <div className={s.itemContainerOptions}>
        <h4 className={s.description}>Tracker Benefits</h4>
        <ul className={s.list}>
          {itemArrOptions.map((item, index) => (
            <li className={s.listItemOptions} key={index}>
              <img src={item.svg} alt="Icon" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.itemContainerBenefits}>
        <h4 className={s.description}>Why drink water</h4>
        <ul className={`${s.list} ${s.listBenefits}`}>
          {itemArrayBenefits.map((item, index) => (
            <li className={s.listItemBenefits} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Item;
