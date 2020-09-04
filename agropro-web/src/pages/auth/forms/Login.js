import React from 'react';

import {
  Form,
  Input
} from 'antd';

import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => (

  <>
    <Form.Item
      name='email'
      rules={[{ required: true }]}
    >
      <Input prefix={<MailOutlined />} placeholder='Email' />
    </Form.Item>

    <Form.Item
      name='password'
      rules={[{ required: true }]}
    >
      <Input prefix={<LockOutlined />} placeholder='Password' />
    </Form.Item>
  </>

)

export default Login;
