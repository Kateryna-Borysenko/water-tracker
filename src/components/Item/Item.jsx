import s from './Item.module.css';

const Item = ({ array, className }) => {
  return (
    <ul className={s.listItems}>
      {array.map((item, index) => (
        <li className={`${s.list} ${s[className]}`} key={index}>
          {item.svg ? (
            <div className={s.listItemBenefits}>
              <img src={item.svg} alt="Icon" />
              {item.text}
            </div>
          ) : (
            <div className={s.listItemOptions}>
              <p>{item}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Item;
