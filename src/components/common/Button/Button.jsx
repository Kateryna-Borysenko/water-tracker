import s from './Button.module.css';

const Button = ({
  type = 'button',
  title,
  icon,
  className,
  onClick,
  ...rest
}) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...rest}>
      {icon && (
        <svg>
          <use href={icon}></use>
        </svg>
      )}
      {title}
    </button>
  );
};

export default Button;
