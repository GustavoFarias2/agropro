import React from 'react';

import {
  Row,
  Col,
  Layout,
  Menu
} from 'antd';

const Header = ({ routes = [], setRoute }) => {

  const handleRouteChange = (route) => setRoute(route)

  return (

    <Layout.Header
      title='Agropro'
      style={{ padding: '0 25px' }}
    >
      <Row>

        <Col
          xs={4}
          sm={4}
        >
          <span style={{ fontSize: 24, color: '#e1e1e1', marginRight: 30 }}>
            Agropro
          </span>
        </Col>

        <Col
          xs={2}
          sm={2}
          md={22}
          flex='auto'
        >
          <Menu theme="dark" mode='horizontal'>
            {routes.map((route, i) =>
              <Menu.Item key={i} onClick={() => handleRouteChange(route)}>
                {route}
              </Menu.Item>
            )}
          </Menu>
        </Col>

        <Col
          xs={18}
          sm={18}
        >
          <div style={{ textAlign: 'right' }}>
            <a href='#'>
              Logout
            </a>
          </div>
        </Col>

      </Row>
    </Layout.Header>

  )

}

export default Header;
