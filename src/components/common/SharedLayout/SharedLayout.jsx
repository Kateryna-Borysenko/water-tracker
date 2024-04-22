import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';
import s from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className={s.wraper}>
        <Header />
        <main style={{ minHeight: '100%' }}>
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default SharedLayout;
