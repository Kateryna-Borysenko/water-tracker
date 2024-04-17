import s from './ErrorMessage.module.css';
const ErrorMessage = ({
  touched,
  errorMessage,
  className = 'errorMessage',
}) => {
  return (
    touched &&
    errorMessage && <div className={s[className]}>{errorMessage}</div>
  );
};
export default ErrorMessage;

//className && className  ??
//   <div className={`${s.errorMessage} ${className}`}>{errorMessage}</div>;
