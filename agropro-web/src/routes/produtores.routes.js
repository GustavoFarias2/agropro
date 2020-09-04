import React, { useState } from 'react';

import Produtores from '../pages/app/Produtores';
import AdicionarProdutores from '../pages/app/Produtores/AdicionarProdutores';

const ProdutoresRoutes = () => {

  const [route, setRoute] = useState('Produtores');

  const [formId, setFormId] = useState(null);

  return route === 'Produtores' ? (

    <Produtores
      setRoute={setRoute}
      setFormId={setFormId}
    />

  ) : (

      <AdicionarProdutores
        setRoute={setRoute}
        formId={formId}
        setFormId={setFormId}
      />

    )

}

export default ProdutoresRoutes;
