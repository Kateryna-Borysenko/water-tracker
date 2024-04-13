import s from './Title.module.css';

const Title = ({ title, className }) => {
  const titleClasses = `${s.title} ${s[className]}`;

  return <h2 className={titleClasses}>{title}</h2>;
};

export default Title;
