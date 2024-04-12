import s from './Subtitle.module.css';

const Subtitle = ({ title, className }) => {
  const subTitleClasses = `${s.title} ${s[className]}`;

  return <h1 className={subTitleClasses}>{title}</h1>;
};

export default Subtitle;
