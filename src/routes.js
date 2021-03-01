import React from 'react';
// import Register from './views/pages/register/register';
// const Users = React.lazy(() => import('./views/users/Users'));
// const User = React.lazy(() => import('./views/users/User'));
const UserList = React.lazy(() => import('./views/UserList/index'));
const RegisterUser = React.lazy(() => import('./views/pages/register/register'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user-list', name: 'UserList', component: UserList },
  { path: '/register',name:'Register', component: RegisterUser},
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/user/:id/edit', exact: true, name: 'User Details', component: RegisterUser}
];

export default routes;
