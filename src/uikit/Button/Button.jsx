import s from './Button.module.css';
import Spinner from '../../components/common/Spinner/Spinner';

const Button = ({
  type = 'button',
  title,
  children,
  className,
  onClick,
  loading,
  ...rest
}) => {
  const buttonClasses = `${s.button} ${s[className]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={loading}
      {...rest}
    >
      {loading && <Spinner color="#fff" size="10px" />}
      {children}
      {!loading && title}
    </button>
  );
};

export default Button;
