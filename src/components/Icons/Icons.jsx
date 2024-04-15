import IconsSprite from '../../assets/static/icons/sprite/icons.svg';
import s from './Icons.module.css';

const Icons = ({
  id,
  className = '#',
  size = '16',
  fill = 'none',
  stroke = '#407bff',
}) => (
  <svg
    className={s[className]}
    width={size}
    height={size}
    fill={fill}
    stroke={stroke}
  >
    <use href={`${IconsSprite}#icon-${id}`} />
  </svg>
);

export default Icons;
