import React, { Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';
import style from './style.module.less';

const children1 = lazy(() => import('./Children1/Children1'));
const children2 = lazy(() => import('./Children2/Children2'));

const Login: React.FC = () => {
  return (
    <div>
      <button>登录</button>
      <div className={style.linkWrap}>
        <NavLink className={style.navLink} to='/login/' exact>
          children1
        </NavLink>

        <NavLink to='/login/children2'>children2</NavLink>
      </div>
      <div className={style.routeWrap}>
        <Suspense fallback='子路由加载中...'>
          <Route path='/login/' component={children1} exact />
          <Route path='/login/children2' component={children2} />
        </Suspense>
      </div>
    </div>
  );
};
export default Login;
