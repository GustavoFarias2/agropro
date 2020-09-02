import React from 'react';

import {
  Row,
  Col,
  Layout,
  Menu
} from 'antd';

const Header = () => (
  
  <Layout.Header title='Agropro'>
    <Row>

      <Col>
        <span style={{
          fontSize: 24,
          color: '#e1e1e1',
          marginRight: 30,
        }}>
          Agropro
      </span>
      </Col>

      <Col>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key={1}>Dashboard</Menu.Item>
          <Menu.Item key={2}>Produtores</Menu.Item>
        </Menu>
      </Col>

    </Row>
  </Layout.Header>

)

export default Header;
