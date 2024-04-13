import s from './MainTitle.module.css';

const MainTitle = ({ title, className }) => {
  const titleClasses = `${s.title} ${s[className]}`;

  return <h1 className={titleClasses}>{title}</h1>;
};

export default MainTitle;
