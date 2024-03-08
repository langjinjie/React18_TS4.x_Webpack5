import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import { Link } from 'react-router-dom-v6';
import Layouts from 'src/Layouts/Layouts';
import NotFound from 'src/pages/NotFound/NotFound';
import RelativeDemo from 'src/pages/RelativeDemo/RelativeDemo';

const Login = lazy(() => import('src/pages/Login/Login'));
const Index = lazy(() => import('src/pages/Index/Index'));
const Class = lazy(() => import('src/pages/Class/Class'));
const IdRoute = lazy(() => import('src/pages/IdRoute/IdRoute'));
const NavLinkDemo = lazy(() => import('src/pages/NavLinkDemo/NavLinkDemo'));

export const indexRoutes: RouteProps[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/class',
    component: Class
  }
];

export const routerV6 = [
  {
    path: '/',
    element: <NotFound />
  },
  {
    path: 'layouts',
    element: <Layouts />,
    children: [
      { path: 'me', element: <Index /> },
      {
        path: ':id',
        element: <IdRoute />,
        children: [
          { path: 'files/*', element: <Link to='../messages'>message</Link> },
          { path: 'messages', element: <div>messages</div> }
        ]
      },
      {
        path: 'navLink',
        element: <NavLinkDemo />,
        children: [
          { path: 'navLink1', element: <div>navLink1</div> },
          { path: 'navLink2', element: <div>navLink2</div> }
        ]
      },
      {
        path: 'relative',
        element: <RelativeDemo />
      }
    ]
  }
];
