import React, { useState } from 'react';

import Header from '../components/Header';

import Dashboard from '../pages/app/Dashboard';
import Produtores from '../pages/app/Produtores';

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

      {route === 'Dashboard' ? <Dashboard /> : <Produtores />}

    </>
  )

}

export default AppRoutes;
