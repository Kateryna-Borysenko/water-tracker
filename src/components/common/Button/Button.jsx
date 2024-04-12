import s from './Button.module.css';

const Button = ({ type = 'button', title, className, onClick, ...rest }) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...rest}>
      {title}
    </button>
  );
};

export default Button;
