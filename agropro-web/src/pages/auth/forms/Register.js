import React from 'react';

import {
  Form,
  Input
} from 'antd';

const Register = ({ registerFailed }) => (

  <>
    <Form.Item
      name='nome'
      label='Nome'
      rules={[{
        required: true,
        message: 'O Nome é nescessário para o cadastro'
      }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name='email'
      label='Email'
      rules={[{
        required: true,
        type: 'email',
        message: 'Por favor, insira um Email valido!'
      }]}
    >
      <Input />
    </Form.Item>

    {
      registerFailed &&
      <span style={{
        fontSize: '16px',
        color: '#f00'
      }}>
        A confirmação da senha parece não conferir!
      </span>
    }

    <Form.Item
      name='password'
      label='Password'
      rules={[{
        required: true,
        message: 'O Senha é nescessária para o cadastro'
      }]}
    >
      <Input type='password' />
    </Form.Item>

    <Form.Item
      name='password_confirmation'
      label='Confirm Password'
      rules={[{
        required: true,
        message: 'A confirmação da senha é nescessária para o cadastro'
      }]}
    >
      <Input type='password' />
    </Form.Item>
  </>

)

export default Register;
