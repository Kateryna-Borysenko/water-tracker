import s from './Subtitle.module.css';

const Subtitle = ({ title, className }) => {
  const subTitleClasses = `${s.title} ${s[className]}`;

  return <h3 className={subTitleClasses}>{title}</h3>;
};

export default Subtitle;
