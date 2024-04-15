import s from './Item.module.css';

const Item = ({ array, className }) => {
  return (
    <ul className={`${s.list} ${s[className]}`}>
      {array.map((item, index) => (
        <li className={`${s.listItemBenefits} ${s.listItemOptions} ${s[className]}`} key={index}>
          {item.svg ? (
            <>
              <img src={item.svg} alt="Icon" />
              {item.text}
            </>
          ) : (
            <span className={s.listItemOptions}>
              <span className={s.point}></span>
              {item}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Item;

