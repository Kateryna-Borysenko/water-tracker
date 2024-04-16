import s from './Button.module.css';

const Button = ({
  type = 'button',
  title,
  children,
  className,
  onClick,
  ...rest
}) => {
  const buttonClasses = `${s.button} ${className}`;

  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...rest}>
      {children}
      {title}
    </button>
  );
};

export default Button;
