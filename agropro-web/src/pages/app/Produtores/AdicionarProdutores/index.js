import React, { useState } from 'react';

import {
  Row,
  Col,
  Card,
  Form,
  Input
} from 'antd';

const AdicionarProdutores = ({ setRoute }) => {

  const [form] = Form.useForm();

  const handleVoltar = () => setRoute('Produtores');

  const [fazendas, setFazendas] = useState([1, 2,3]);

  return (
    <Row
      justify='center'
      align='middle'
      style={{ padding: 20, paddingTop: 50 }}
    >
      <Col span={24}>

        <Card
          title='Adicionar um Produtor'
          extra={
            <span
              onClick={() => handleVoltar()}
              style={{ cursor: 'pointer', color: '#1890ff' }}
            >
              Voltar
            </span>
          }
        >
          <Form
            form={form}
            layout="vertical"
          // onValuesChange={handleChange}
          // onFinish={handleButtonClick}
          >

            <Row>
              <Col xs={24} sm={24} md={8}>

                <Form.Item
                  name='cpfCnpj'
                  label='Cpf / Cpnj'
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='nome'
                  label='Nome'
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

              </Col>
            </Row>

            Fazendas

            {fazendas.map((fazenda) => (
              <Row>
                <Col>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='cpfCnpj'
                    label='Cpf / Cpnj'
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            ))}

          </Form>
        </Card>

      </Col>
    </Row>
  )

}

export default AdicionarProdutores;
