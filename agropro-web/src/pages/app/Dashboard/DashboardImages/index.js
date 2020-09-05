import React, { useState, useEffect } from 'react';

import api from '../../../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { produtoresActions } from '../../../../reducers/produtores';

import { Row } from 'antd';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../../../assets/icons/fazenda.png';
import ImageTrator from '../../../../assets/icons/trator.png';
import ImageArvore from '../../../../assets/icons/arvore.png';

const DashboardImages = () => {

  const produtores = useSelector((state) => state.produtores);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  const [area_total, setArea_total] = useState(0);
  const [area_consolidada_total, setArea_consolidada_total] = useState(0);
  const [area_legal_total, setArea_legal_total] = useState(0);

  useEffect(() => {

    const getDashboardData = async () => {

      const response = await api.get('produtor');

      if (response.status === 200)
        await dispatch(produtoresActions.LOAD_PRODUTORES(response.data))

      if (produtores.length > 0) {

        const fazendasArrays = produtores.map((produtor) => produtor.fazendas);

        let area_total_temp = 0;
        let area_consolidada_total_temp = 0;
        let area_legal_total_temp = 0;

        await fazendasArrays.forEach((fazendas) => {
          fazendas.forEach((fazenda) => {
            area_total_temp += fazenda.area;
            area_consolidada_total_temp += fazenda.area_consolidada;
            area_legal_total_temp += fazenda.area_legal;
          });
        });

        setArea_total(area_total_temp);
        setArea_consolidada_total(area_consolidada_total_temp);
        setArea_legal_total(area_legal_total_temp);

        setLoaded(true);
      }

    }

    !loaded && getDashboardData();

  }, [produtores]);

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
