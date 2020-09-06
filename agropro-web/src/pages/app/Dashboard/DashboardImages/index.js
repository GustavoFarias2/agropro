import React from 'react';

import { Row } from 'antd';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../../../assets/icons/fazenda.png';
import ImageTrator from '../../../../assets/icons/trator.png';
import ImageArvore from '../../../../assets/icons/arvore.png';

const DashboardImages = ({ areas }) => {

  const [area_total, area_consolidada_total, area_legal_total] = areas;

  return (

    <Row
      justify='center'
      align='middle'
      style={{ marginBottom: 10 }}
    >

      <DashboardImage
        label="Area total em fazendas"
        image={ImageFazenda}
        value={area_total}
      />
      <DashboardImage
        label="Area Consolidada nas fazendas"
        image={ImageTrator}
        value={area_consolidada_total}
      />
      <DashboardImage
        label="Area Legal das fazendas"
        image={ImageArvore}
        value={area_legal_total}
      />

    </Row>

  )

}

export default DashboardImages;
