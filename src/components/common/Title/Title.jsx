import s from './Title.module.css';

const Title = ({ title, className }) => {
  const titleClasses = `${s.title} ${s[className]}`;

  return <h1 className={titleClasses}>{title}</h1>;
};

export default Title;
