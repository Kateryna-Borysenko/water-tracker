import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../Container/Container';
import Header from '../Header/Header';
import Spinner from '../Spinner/Spinner';

import s from './SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <main style={{ height: '100%' }}>
          <Container>
            <Outlet />
          </Container>
        </main>
      </Suspense>
    </>
  );
};

export default SharedLayout;
