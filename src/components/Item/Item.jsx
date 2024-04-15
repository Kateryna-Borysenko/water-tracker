import s from './Item.module.css';

const Item = ({ array, className }) => {
  return (
    <ul className={s.listItems}>
      {array.map((item, index) => (
        <li className={`${s.list} ${s[className]}`} key={index}>
          {item.svg ? (
            <>
              <img src={item.svg} alt="Icon" />
              {item.text}
            </>
          ) : (
            <>{item}</>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Item;
