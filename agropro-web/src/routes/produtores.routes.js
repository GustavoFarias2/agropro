import React, { useState } from 'react';

import Produtores from '../pages/app/Produtores';
import AdicionarProdutores from '../pages/app/Produtores/AdicionarProdutores';

const ProdutoresRoutes = () => {

  const [route, setRoute] = useState('Produtores');

  return route === 'Produtores' ? <Produtores setRoute={setRoute} /> : <AdicionarProdutores setRoute={setRoute} />

}

export default ProdutoresRoutes;
