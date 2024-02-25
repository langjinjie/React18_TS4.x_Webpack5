import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const indexRoutes: RouteProps[] = [
  {
    path: '/login',
    component: lazy(() => import('src/pages/Login/Login'))
  },
  {
    path: '/index',
    component: lazy(() => import('src/pages/Index/Index'))
  },
  {
    path: '/class',
    component: lazy(() => import('src/pages/Class/Class'))
  }
];
