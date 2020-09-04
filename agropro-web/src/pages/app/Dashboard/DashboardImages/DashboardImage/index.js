import React from 'react';

import { Col } from 'antd';

const DashboardImage = ({ label, image, value }) => (

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

    <span style={{
      fontSize: 16,
      fontWeight: 500
    }}>
      {label}
    </span>

    <img
      src={image}
      alt='dashboardImage'
      style={{
        width: '80px',
        height: '80px',
        alignSelf: 'center'
      }}
    />

    <span style={{ fontSize: 16 }}>
      {value} ha
    </span>

  </Col>

)

export default DashboardImage;
