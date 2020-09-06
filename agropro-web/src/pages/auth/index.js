import React, { useState } from 'react';

import api from '../../services/api';

import { useDispatch } from 'react-redux';
import { tokenActions } from '../../reducers/token';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  message
} from 'antd';

import Login from './forms/Login';
import Register from './forms/Register';

const Auth = () => {

  const [form] = Form.useForm();

  const [title, setTitle] = useState('Login');

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [loginFailed, setLoginFailed] = useState(false);
  const [registerFailed, setRegisterFailed] = useState(false);

  const handleButtonClick = async (values) => {

    let hide = message.loading('carregando...');
    setLoading(true);

    setRegisterFailed(false);

    if (title === 'Login') {

      const response = await api.post('auth', values);

      if (response.status === 200)
        dispatch(tokenActions.LOGIN(response.data.token));

      if (response.status === 401)
        setLoginFailed(true);

      setLoading(false);
      hide();

    }
    else {

      if (form.getFieldsValue().password !== form.getFieldsValue().password_confirmation) {
        setRegisterFailed(true);
        setLoading(false);
        hide();
      }
      else {

        const response = await api.post('user', values);

        if (response.status === 200) {

          form.resetFields();

          setTitle('Login');
          setLoading(false);

          hide();
          hide = message.success('Conta criada!');
          setTimeout(hide, 2000);

        }

      }

    }

  }

  const handleRegisterClick = () => {
    form.resetFields();

    title === 'Login' ? setTitle('Register') : setTitle('Login');
  }

  return (

    <Row justify='center' align='middle' style={{ height: '100%' }}>
      <Col md={10} sm={24}>

        <Card title={title}>

          {
            loginFailed &&
            <span style={{
              fontSize: '16px',
              color: '#f00'
            }}>
              Email e/ou senha parecem não estarem corretos
            </span>
          }

          <Form
            form={form}
            layout="vertical"
            onFinish={handleButtonClick}
          >

            {
              title === 'Login' ?
                <Login />
                :
                <Register registerFailed={registerFailed} />
            }

            <Form.Item style={{ marginTop: 20 }}>

              <Button
                disabled={loading}
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
