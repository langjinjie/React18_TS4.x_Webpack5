/**
 * 此处处理router
 */

import React, { /* Suspense, */ Suspense, lazy } from 'react';
import { Route, Switch, withRouter, RouteComponentProps, Link } from 'react-router-dom';
// import { indexRoutes } from 'src/routes/index';
// import { Loading } from 'src/components';
import { Loading } from 'src/components';
import style from './style.module.less';

const Index = lazy(() => import('src/pages/Index/Index'));
const Login = lazy(() => import('src/pages/Login/Login'));
const ClassNode = lazy(() => import('src/pages/Class/Class'));

const Layouts: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <div className={style.wrap}>
      <ul className={style.menu}>
        <Link to='/index'>Index</Link>
        <Link to='/login'>login</Link>
        <Link to='/class'>Class</Link>
      </ul>
      <div>
        <Suspense fallback={<Loading />}>
          <Switch location={location}>
            {/* {indexRoutes.map(item => ( */}
            <Route key={`rt/index`} path='/index' component={Index} exact />
            <Route key={`rt/class`} path='/class' component={ClassNode} exact />
            <Route key={`rt/login`} path='/login' component={Login} exact />
            {/* ))} */}
            {/* <Redirect from='/*' to='/login' /> */}
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};
export default withRouter(Layouts);
