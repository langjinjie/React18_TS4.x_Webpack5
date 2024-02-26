/**
 * 此处处理router
 */

import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { Icon } from 'src/components';
import { indexRoutes } from 'src/routes';
import { Suspense } from 'react';
import style from './style.module.less';

const { Sider } = Layout;

const Layouts: React.FC<RouteComponentProps> = ({ history }) => {
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
            children: [
              {
                icon: <Icon className={style.icon} name='icon-shouhoufuwu1' />,
                key: `sub-${path}1`,
                label: `sub-${path}1`,
                path,
                onClick() {
                  history.push(path as string);
                }
              },
              {
                icon: <Icon className={style.icon} name='icon-shouhoufuwu1' />,
                key: `sub-${path}2`,
                label: `sub-${path}2`,
                path,
                type: '',
                onClick() {
                  history.push(path as string);
                }
              }
            ]
          }))}
        />
      </Sider>
      <div>
        <Suspense fallback='加载中...'>
          <Switch>
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
