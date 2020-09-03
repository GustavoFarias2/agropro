import React from 'react';

import {
  Row,
  Col,
  Layout,
  Menu
} from 'antd';

const Header = ({ routes = [], setRoute }) => {

  const handleRouteChange = (route) => setRoute(route);

  const handleLogout = () => { }

  return (

    <Layout.Header
      title='Agropro'
      style={{ padding: '0 25px' }}
    >
      <Row>

        <Col
          xs={4}
          sm={4}
          md={2}
        >
          <span style={{ fontSize: 24, color: '#e1e1e1', marginRight: 30 }}>
            Agropro
          </span>
        </Col>

        <Col
          xs={2}
          sm={2}
          md={20}
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
          md={2}
          style={{ textAlign: 'right' }}
        >
          <span
            onClick={() => handleLogout()}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            Logout
          </span>
        </Col>

      </Row>
    </Layout.Header>

  )

}

export default Header;
