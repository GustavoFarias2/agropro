import React from 'react';

import { Row } from 'antd';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../../../assets/icons/fazenda.png';
import ImageArvore from '../../../../assets/icons/arvore.png';
import ImageTrator from '../../../../assets/icons/trator.png';

const DashboardImages = () => {

  return (

    <Row
      justify='space-between'
      align='middle'
      style={{ marginBottom: 10 }}
    >

      <DashboardImage
        image={ImageFazenda}
        value="200"
      />
      <DashboardImage
        image={ImageArvore}
        value="320.22"
      />
      <DashboardImage
        image={ImageTrator}
        value="120"
      />

    </Row>

  )

}

export default DashboardImages;
