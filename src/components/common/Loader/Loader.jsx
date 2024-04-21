import s from './Loader.module.css';

const Loader = ({ children }) => {
  return <div className={s.loader}>{children}</div>;
};

export default Loader;
