import React from 'react';

import {
  Form,
  Input
} from 'antd';

const Register = () => (

  <>
    <Form.Item
      name='nome'
      label='Nome'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='email'
      label='Email'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='password'
      label='Password'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='password_confirmation'
      label='Confirm Password'
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>
  </>

)

export default Register;
