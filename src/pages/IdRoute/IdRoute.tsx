import React from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom-v6';
import style from './style.module.less';

const IdRoute: React.FC = () => {
  const location = useLocation();

  return (
    <div className={style.wrap}>
      <Link to='..'>parent</Link>
      <br />
      <Link to='files'>files</Link>
      {location.state && (
        <div>
          location.state:
          {location.state}
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default IdRoute;
