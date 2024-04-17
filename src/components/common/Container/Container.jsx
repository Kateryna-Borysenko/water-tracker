import s from './Container.module.css';

const Container = ({ children, className }) => {
  const containerClasses = `${s.container} ${s[className]}`;

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
