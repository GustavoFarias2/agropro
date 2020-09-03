import React, { useState } from 'react';

import Header from '../components/Header';

import Dashboard from '../pages/app/Dashboard';
import ProdutoresRoutes from './produtores.routes';

const AppRoutes = () => {

  const [route, setRoute] = useState('Dashboard');

  const routes = [
    'Dashboard',
    'Produtores'
  ]

  return (
    <>

      <Header
        routes={routes}
        setRoute={setRoute}
      />

      {route === 'Dashboard' ? <Dashboard /> : <ProdutoresRoutes />}

    </>
  )

}

export default AppRoutes;
