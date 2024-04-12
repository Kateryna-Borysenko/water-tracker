import { useTranslation } from 'react-i18next';
import ukrainianFlagIcon from '../../assets/static/images/ukrainian-flag.png';
import americanFlagIcon from '../../assets/static/images/american-flag.png';
import s from './LangsSwitcher.module.css';

const languages = {
  en: { icon: americanFlagIcon, nativeName: 'English' },
  ukr: { icon: ukrainianFlagIcon, nativeName: 'Українська' },
};

const LangsSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className={s.switcher}>
      {Object.keys(languages).map(lng => (
        <div key={lng} className={s.btnWrapper}>
          <button
            className={i18n.resolvedLanguage === lng ? s.active : s.button}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            <img
              src={languages[lng].icon}
              alt={languages[lng].nativeName}
              width="50"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LangsSwitcher;
