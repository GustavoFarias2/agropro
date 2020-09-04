import React from 'react';

import { Provider } from 'react-redux';
import store from './reducers';

import { Layout } from 'antd';

import Routes from './routes';

const { Content } = Layout;

const Auth = () => {

  return (

    <Provider store={store}>

      <Layout
        className='layout'
        style={{ height: '100%' }}
      >
        <Content>

          <Routes />

        </Content>
      </Layout>

    </Provider>
  )

}

export default Auth;
