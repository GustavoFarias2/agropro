import React, { useState } from 'react';

import api from '../../services/api';

import {
  Row,
  Col,
  Card,
  Form,
  Button
} from 'antd';

import Login from './forms/Login';
import Register from './forms/Register';

const Auth = () => {

  const [form] = Form.useForm();

  const [title, setTitle] = useState('Login');

  const handleChange = () => { }

  const handleButtonClick = async (values) => {

    if (title === 'Login') {

      const response = await api.post('auth', values);

      if (response.status === 200) {

        console.log('logged')

      }

    }
    else {

      const response = await api.post('user', values);

      if (response.status === 200) {
        setTitle('Login')
      }

    }

  }

  const handleRegisterClick = () => {
    title === 'Login' ? setTitle('Register') : setTitle('Login');
  }

  return (

    <Row justify='center' align='middle' style={{ height: '100%' }}>
      <Col md={10} sm={24}>

        <Card title={title}>

          <Form
            form={form}
            layout="vertical"
            onValuesChange={handleChange}
            onFinish={handleButtonClick}
          >

            {title === 'Login' ? <Login /> : <Register />}

            <Form.Item style={{ marginTop: 20 }}>

              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
              <span
                href='#'
                onClick={() => handleRegisterClick()}
                style={{
                  cursor: 'pointer',
                  color: '#1890ff',
                  marginLeft: 20,
                  marginRight: 20
                }}
              >
                Create account now
              </span>

            </Form.Item>

          </Form>

        </Card>

      </Col>
    </Row>

  )

}

export default Auth;
