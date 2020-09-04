import React, { useState } from 'react';

import api from '../../../../services/api';

import { useDispatch } from 'react-redux';
import { produtoresActions } from '../../../../reducers/produtores';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  InputNumber,
  Select
} from 'antd';

import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import estados from '../../../../assets/estados';

const AdicionarProdutores = ({ setRoute, formId, setFormId }) => {

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [fazendas, setFazendas] = useState([0]);

  const handleVoltar = () => {

    setFormId(null);

    setRoute('Produtores');

  }

  const handleAdicionarFazenda = () => {

    if (fazendas.length > 0)
      setFazendas([...fazendas, fazendas[fazendas.length - 1] + 1]);
    else
      setFazendas([0]);

  }

  const handleRemoverFazenda = (i) => setFazendas(fazendas.filter((_, index) => i !== index));

  const handleCofirm = async (values) => {

    const produtor = {
      cpf_cnpj: values.cpf_cnpj,
      nome: values.nome
    }

    const response = await api.post('produtor', produtor);

    if (response.status === 200) {

      dispatch(produtoresActions.ADD_PRODUTOR(response.data));

      setRoute('Produtores');

    }

  }

  return (
    <Row
      justify='center'
      align='middle'
      style={{ padding: 20, paddingTop: 30 }}
    >
      <Col span={24}>

        <Card
          title='Adicionar um Produtor'
          extra={
            <>
              <span
                onClick={() => handleVoltar()}
                style={{ cursor: 'pointer', color: '#1890ff', marginRight: '15px' }}
              >
                voltar
              </span>
              <span
                onClick={() => form.submit()}
                style={{ cursor: 'pointer', fontWeight: 500, fontSize: '16px' }}
              >
                Confirmar
              </span>
            </>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCofirm}
          >

            <Row>
              <Col xs={24} sm={24} md={8}>

                <Form.Item name='cpf_cnpj' label='Cpf / Cpnj' rules={[{ required: true }]}>
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name='nome' label='Nome' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

              </Col>
            </Row>

            <Row align='middle'>
              <span style={{ fontSize: 16, fontWeight: 500 }}>
                Fazendas
              </span>

              <PlusCircleOutlined
                onClick={() => handleAdicionarFazenda()}
                style={{ fontSize: '18px', marginLeft: '12px', cursor: 'pointer' }}
              />
            </Row>

            {fazendas.map((fazenda, i) => (
              <Row key={i} style={{ marginTop: 25 }}>

                <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>
                  <Form.Item name={['fazenda ' + fazenda, 'nome']} label='Nome da Fazenda' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['fazenda ' + fazenda, 'endereco', 'cidade']} label='Cidade' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['fazenda ' + fazenda, 'endereco', 'estado']} label='Estado' rules={[{ required: true }]}>
                    <Select placeholder='Estado'>
                      {estados.map((estado, i) => <Select.Option key={i} name={estado.toLocaleLowerCase()}>{estado}</Select.Option>)}
                    </Select>
                  </Form.Item>
                  <Form.Item name={['fazenda ' + fazenda, 'endereco', 'culturas']} label='Culturas' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>
                  <Form.Item name={['fazenda ' + fazenda, 'area']} label='Área' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['fazenda ' + fazenda, 'area_consolidada']} label='Área Consolidade' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name={['fazenda ' + fazenda, 'area_legal']} label='Área Legal' rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => handleRemoverFazenda(i)}
                    style={{ fontSize: '22px', marginLeft: '10px', marginTop: '15px', cursor: 'pointer' }}
                  />
                </Col>

                <div style={{ border: '1px solid #f0f0f0', width: '100%' }}></div>

              </Row>
            ))}

          </Form>
        </Card>

      </Col>
    </Row>
  )

}

export default AdicionarProdutores;
