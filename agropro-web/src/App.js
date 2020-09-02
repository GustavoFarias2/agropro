import React from 'react';

import { Layout } from 'antd';

import Routes from './routes';

const { Content } = Layout;

const Auth = () => {

  return (

    <Layout className='layout' style={{ height: '100%' }}>

      <Content>

        <Routes />

      </Content>

    </Layout>

  )

}

export default Auth;
