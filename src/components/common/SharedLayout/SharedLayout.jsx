import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <main style={{ height: '100%' }}>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default SharedLayout;
