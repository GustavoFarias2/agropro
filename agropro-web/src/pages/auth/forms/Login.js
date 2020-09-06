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
      rules={[{
        required: true,
        type: 'email',
        message: 'Por favor, insira um Email valido!'
      }]}
    >
      <Input prefix={<MailOutlined />} placeholder='Email' />
    </Form.Item>

    <Form.Item
      name='password'
      rules={[{ required: true }]}
    >
      <Input
        type='password'
        prefix={<LockOutlined />}
        placeholder='Password'
      />
    </Form.Item>
  </>

)

export default Login;
