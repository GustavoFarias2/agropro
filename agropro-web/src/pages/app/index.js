import React from 'react';

import {
  Row,
  Col,
  Card,
  Select
} from 'antd';

import Header from './Header';

import DashboardImage from './DashboardImage';
import ImageFazenda from '../../assets/icons/fazenda.png';
import ImageArvore from '../../assets/icons/arvore.png';
import ImageTrator from '../../assets/icons/trator.png';

import estados from '../../assets/estados';

const App = () => {

  return (

    <>
      <Header />

      <Row justify='center' align='middle' style={{ padding: 20, paddingTop: 50 }}>
        <Col md={12} sm={24}>

          <Card title='Dashboard'>

            <Row justify='space-between' align='middle' style={{ marginBottom: 10 }}>
              <DashboardImage image={ImageFazenda} value="200" />
              <DashboardImage image={ImageArvore} value="320.22" />
              <DashboardImage image={ImageTrator} value="120" />
            </Row>

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

    </>

  )

}

export default App;
