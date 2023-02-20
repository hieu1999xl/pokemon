import { Outlet } from 'react-router';
import { Header } from '../index';
import { useEffect } from 'react';

const AppLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="main_page">
      <div className={'overflow-hidden'}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
