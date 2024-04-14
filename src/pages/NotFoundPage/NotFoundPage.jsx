import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '../../components/common/Meta/Meta';
import image from '../../assets/static/image/crying-water.png';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      <Meta title="Not Found Page" />
      <div className={s.container}>
        <img src={image} className={s.image} alt="Not Found Image" />

        <h1 className={s.title}>
          <span className={s.text}>Oopsie!</span> We could not find this page
        </h1>
        <div className={s.description}>
          Mistakes happen... and that is okay. You will be redirected to
          <span className={s.accent}> The Welcome Page</span> and start your
          journey from there after
          <span className={s.accent}> {countdown} seconds.</span>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
