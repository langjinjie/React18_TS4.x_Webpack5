/**
 * 此处处理router
 */

import { Suspense } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { Icon, Loading } from 'src/components';
import { indexRoutes } from 'src/routes';
import style from './style.module.less';

const { Sider } = Layout;

const Layouts: React.FC<RouteComponentProps> = ({ location, history }) => {
  return (
    <Layout className={style.wrap}>
      <Sider theme='light'>
        <Menu
          mode='inline'
          items={indexRoutes.map(({ path }) => ({
            icon: <Icon className={style.icon} name='icon-fangzi-copy' />,
            key: `nav-${path}`,
            label: `nav-${path}`,
            path,
            type: '',
            children: [
              {
                icon: <Icon className={style.icon} name='icon-shouhoufuwu1' />,
                key: `sub-${path}`,
                label: `sub-${path}`,
                path,
                type: '',
                onClick() {
                  console.log('123');
                  history.push(path as string);
                }
              }
            ]
          }))}
        />
      </Sider>
      <div>
        <Suspense fallback={<Loading />}>
          <Switch location={location}>
            {indexRoutes.map(({ path, component }) => (
              <Route key={`${path}`} path={path} component={component} />
            ))}
          </Switch>
        </Suspense>
      </div>
    </Layout>
  );
};
export default withRouter(Layouts);
