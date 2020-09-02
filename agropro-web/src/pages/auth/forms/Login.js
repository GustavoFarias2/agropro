import React from 'react';

import {
  Form,
  Input
} from 'antd';

const Login = () => (

  <>
    <Form.Item
      name='email'
      label='Email'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='password'
      label='password'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
  </>

)

export default Login;
