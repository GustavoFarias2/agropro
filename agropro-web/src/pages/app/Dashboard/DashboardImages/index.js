import React from 'react';

import { Row } from 'antd';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../../../assets/icons/fazenda.png';
import ImageTrator from '../../../../assets/icons/trator.png';
import ImageArvore from '../../../../assets/icons/arvore.png';

const DashboardImages = () => {

  return (

    <Row
      justify='center'
      align='middle'
      style={{ marginBottom: 10 }}
    >

      <DashboardImage
        label="Area total em fazendas"
        image={ImageFazenda}
        value="200"
      />
      <DashboardImage
        label="Area Consolidada nas fazendas"
        image={ImageTrator}
        value="120"
      />
      <DashboardImage
        label="Area Legal das fazendas"
        image={ImageArvore}
        value="320.22"
      />

    </Row>

  )

}

export default DashboardImages;
