import React from 'react';

import { Col } from 'antd';

const DashboardImage = ({ image, value }) => (

  <Col style={{
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 20,
    textAlign: 'center'
  }}>
    <img
      src={image}
      style={{
        width: '80px',
        height: '80px'
      }}
      alt='dashboardImage'
    />
    <span style={{
      marginTop: '5px'
    }}>
      {value} ha
    </span>
  </Col>

)

export default DashboardImage;
