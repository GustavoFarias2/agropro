import React, { useState, useEffect } from 'react';

import api from '../../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { produtoresActions } from '../../../reducers/produtores';

import {
  Row,
  Col,
  Card,
  Select,
  Form,
  Table
} from 'antd';

import DashboardImages from './DashboardImages';

import tableFazendaColumns from '../../../assets/tableFazendaColumns';

const App = () => {

  const produtores = useSelector((state) => state.produtores);

  const fazendasArrays = produtores.map((produtor) => produtor.fazendas).flat();

  const [fazendasInTable, setFazendasInTable] = useState(fazendasArrays);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  const [culturas, setCulturas] = useState([]);
  const [estados, setEstados] = useState([]);

  const [area_total, setArea_total] = useState(0);
  const [area_consolidada_total, setArea_consolidada_total] = useState(0);
  const [area_legal_total, setArea_legal_total] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {

    const formatData = async () => {

      let area_total_temp = 0;
      let area_consolidada_total_temp = 0;
      let area_legal_total_temp = 0;
      setCulturas([]);

      await fazendasArrays.forEach((fazenda) => {
        area_total_temp += fazenda.area;
        area_consolidada_total_temp += fazenda.area_consolidada;
        area_legal_total_temp += fazenda.area_legal;

        setCulturas((oldCulturas) => [...oldCulturas, fazenda.culturas]);
      });

      setArea_total(area_total_temp);
      setArea_consolidada_total(area_consolidada_total_temp);
      setArea_legal_total(area_legal_total_temp);
      setCulturas((oldCulturas) => [...new Set(oldCulturas)]);

    }

    const getDashboardImageData = async () => {

      const response = await api.get('produtor');

      setLoaded(true);

      if (response.status === 200)
        await dispatch(produtoresActions.LOAD_PRODUTORES(response.data));

      if (produtores.length > 0)
        await formatData();

    }

    !loaded && getDashboardImageData();

  }, [loaded, dispatch, fazendasArrays, produtores]);

  const handleChangeCultura = (cultura) => {

    form.resetFields(['estado']);

    const fazendasFiltered = fazendasArrays.filter((fazenda) => fazenda.culturas.toLowerCase() === cultura.toLowerCase())

    const estados = fazendasFiltered.map((fazenda) => fazenda.estado)

    const estadosWithoutDuplicate = [...new Set(estados)];

    setFazendasInTable(fazendasFiltered);

    setEstados(estadosWithoutDuplicate);

  }

  const handleChangeEstado = (estado) => {

    const fazendasFilteredByCultura = fazendasArrays
      .filter((fazenda) => fazenda.culturas.toLowerCase() === form.getFieldsValue().culturas.toLowerCase());

    const fazendasFilteredByCulturaAndEstado = fazendasFilteredByCultura
      .filter((fazenda) => fazenda.estado.toLocaleLowerCase() === estado.toLocaleLowerCase());

    setFazendasInTable(fazendasFilteredByCulturaAndEstado);

  }

  return (

    <Row justify='center' align='middle' style={{ padding: 20, paddingTop: 30 }}>
      <Col md={14} sm={24}>

        <Card title='Dashboard'>

          <DashboardImages areas={[area_total, area_consolidada_total, area_legal_total]} />

          <span style={{ fontSize: 16, fontWeight: 500 }}>
            Filtro de Fazendas
          </span>
          <hr />

          <Form
            form={form}
            layout='horizontal'
          >
            <Row align='middle' justify='center' gutter={30}>
              <Form.Item name='culturas' style={{ width: '48%', marginRight: 2 }}>
                <Select
                  placeholder='Cultura'
                  onChange={(cultura) => handleChangeCultura(cultura)}
                >
                  {culturas.map((cultura) => <Select.Option key={cultura} name={cultura.toLocaleLowerCase()}>{cultura}</Select.Option>)}
                </Select>
              </Form.Item>

              <Form.Item name='estado' style={{ width: '48%' }}>
                <Select
                  placeholder='Estado'
                  onChange={(estado) => handleChangeEstado(estado)}
                >
                  {estados.map((estado) => <Select.Option key={estado} name={estado.toLocaleLowerCase()}>{estado}</Select.Option>)}
                </Select>
              </Form.Item>
            </Row>
          </Form>

          <Table
            rowKey={(row) => row.id}
            columns={tableFazendaColumns()}
            dataSource={fazendasInTable}
            scroll
            pagination={{ hideOnSinglePage: true }}
          />

        </Card>

      </Col>
    </Row>

  )

}

export default App;
