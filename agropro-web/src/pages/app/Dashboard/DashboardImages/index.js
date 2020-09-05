import React, { useState, useEffect, useCallback } from 'react';

import api from '../../../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { produtoresActions } from '../../../../reducers/produtores';

import { Row } from 'antd';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../../../assets/icons/fazenda.png';
import ImageTrator from '../../../../assets/icons/trator.png';
import ImageArvore from '../../../../assets/icons/arvore.png';

const DashboardImages = () => {

  // const produtores = useSelector((state) => state.produtores);

  const fazendasArrays = useSelector((state) => state.produtores.map((produtor) => produtor.fazendas));

  const dispatch = useDispatch();

  const [area_total, setArea_total] = useState(0);
  const [area_consolidada_total, setArea_consolidada_total] = useState(0);
  const [area_legal_total, setArea_legal_total] = useState(0);

  const functionHandler = useCallback(async () => {

    const response = await api.get('produtor');

    if (response.status === 200)
      dispatch(produtoresActions.LOAD_PRODUTORES(response.data))

    let area_total_temp = 0;
    let area_consolidada_total_temp = 0;
    let area_legal_total_temp = 0;

    if (fazendasArrays.length > 0) {

      await fazendasArrays.forEach((fazendas) => {
        fazendas.forEach((fazenda) => {
          area_total_temp += fazenda.area;
          area_consolidada_total_temp += fazenda.area_consolidada;
          area_legal_total_temp += fazenda.area_legal;
        });
      });

    }

    // return [
    //   area_total_temp,
    //   area_consolidada_total_temp,
    //   area_legal_total_temp
    // ]

    // await getProdutores();
    // const [
    //   area_total_temp,
    //   area_consolidada_total_temp,
    //   area_legal_total_temp
    // ] = await formatDashboardData();
    setArea_total(area_total_temp);
    setArea_consolidada_total(area_consolidada_total_temp);
    setArea_legal_total(area_legal_total_temp);
  }, [])

  useEffect(() => {

    functionHandler();
    console.log('a')

  }, [fazendasArrays]);

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
