import React, { useEffect } from 'react';

import api from '../../../services/api';

import {
  Row,
  Col,
  Card,
  Select
} from 'antd';

import DashboardImages from './DashboardImages';

import estados from '../../../assets/estados';

const App = () => {

  useEffect(() => {

    const getProdutores = async () => {

      await api.get('produtor');

    }

    getProdutores();

  }, []);

  return (

    <Row
      justify='center'
      align='middle'
      style={{ padding: 20, paddingTop: 30 }}
    >
      <Col
        md={12}
        sm={24}
      >

        <Card title='Dashboard'>

          <DashboardImages />

          <Row align='middle' justify='center' gutter={20}>
            <Col md={11} sm={24}>
              <Select placeholder='Cultura' style={{ width: '100%' }}>
                <Select.Option name='soja'>Soja</Select.Option>
              </Select>
            </Col>
            <Col md={2} sm={24} style={{ textAlign: 'center' }}>
              ou
            </Col>
            <Col md={11} sm={24}>
              <Select placeholder='Estado' style={{ width: '100%' }}>
                {estados.map((estado, i) => <Select.Option key={i} name={estado.toLocaleLowerCase()}>{estado}</Select.Option>)}
              </Select>
            </Col>
          </Row>

          <Row>
            <Col>
            </Col>
            <Col>
            </Col>
          </Row>

        </Card>

      </Col>
    </Row>

  )

}

export default App;
