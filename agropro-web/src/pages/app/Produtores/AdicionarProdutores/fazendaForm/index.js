import React from 'react';

import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select
} from 'antd';

import { MinusCircleOutlined } from '@ant-design/icons';

import estados from '../../../../../assets/estados';

const fazendaForm = ({ form, fazenda, index, handleRemoverFazenda }) => {

  return (
    <Row style={{ marginTop: 25 }}>
      <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>

        <Form.Item name={['fazenda ' + fazenda, 'nome']} label='Nome da Fazenda' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['fazenda ' + fazenda, 'cidade']} label='Cidade' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['fazenda ' + fazenda, 'estado']} label='Estado' rules={[{ required: true }]}>
          <Select placeholder='Estado'>
            {estados.map((estado, i) => <Select.Option key={i} name={estado.toLocaleLowerCase()}>{estado}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item name={['fazenda ' + fazenda, 'culturas']} label='Culturas' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

      </Col>
      <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>

        <Form.Item
          name={['fazenda ' + fazenda, 'area']}
          label='Área'
          rules={[{
            required: true,
            validator: (_, value) =>
              value > (form.getFieldValue('fazenda ' + fazenda).area_consolidada + form.getFieldValue('fazenda ' + fazenda).area_legal) ?
                Promise.resolve() : Promise.reject('Os valores das Areas da fazenda não podem ser maiores que o valor da Área total')
          }]}
        >
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        <Form.Item name={['fazenda ' + fazenda, 'area_consolidada']} label='Área Consolidade' rules={[{ required: true }]}>
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        <Form.Item name={['fazenda ' + fazenda, 'area_legal']} label='Área Legal' rules={[{ required: true }]}>
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        <MinusCircleOutlined
          onClick={() => handleRemoverFazenda(index)}
          style={{ fontSize: '22px', marginLeft: '10px', marginTop: '15px', cursor: 'pointer' }}
        />

      </Col>
      <div style={{ border: '1px solid #f0f0f0', width: '100%' }}></div>
    </Row>
  )

}

export default fazendaForm;
