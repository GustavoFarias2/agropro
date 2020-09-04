import React from 'react';

import { useSelector } from 'react-redux';

import Auth from '../pages/auth';
import AppRoutes from './app.routes';

const Routes = () => {

  const token = useSelector((state) => state.token);

  return token ? <AppRoutes /> : <Auth />

}

export default Routes;
