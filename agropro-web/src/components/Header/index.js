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

            {routes.map((route, i) =>
              <Menu.Item
                key={i}
                onClick={() => handleRouteChange(route)}
              >
                {route}
              </Menu.Item>
            )}

          </Menu>
        </Col>

      </Row>
    </Layout.Header>

  )

}

export default Header;
