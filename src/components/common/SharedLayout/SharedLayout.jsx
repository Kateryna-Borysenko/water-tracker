import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';
import s from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <div className={s.wraper}>
      <Header />
      <Suspense fallback={<Spinner />}>
        <main style={{ minHeight: '100%' }}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default SharedLayout;
