import React from 'react';

import { Col } from 'antd';

const DashboardImage = ({ image, value }) => (

  <Col
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 100,
      paddingRight: 100,
      marginBottom: 20,
      textAlign: 'center'
    }}
  >

    <img
      src={image}
      alt='dashboardImage'
      style={{
        width: '80px',
        height: '80px'
      }}
    />

    <span style={{ marginTop: '5px' }}>
      {value} ha
    </span>

  </Col>

)

export default DashboardImage;