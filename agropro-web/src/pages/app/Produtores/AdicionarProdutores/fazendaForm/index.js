import React from 'react';

import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm
} from 'antd';

import {
  DeleteOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

import estados from '../../../../../assets/estados';

const fazendaForm = ({ fazenda, form, index, handleRemoverFazenda, handleRemoverExistingFazenda }) => {

  return (
    <Row style={{ marginTop: 25 }}>
      <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'id']}
          hidden
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'nome']}
          label='Nome da Fazenda'
          rules={[{
            required: true,
            message: 'É nescessário o nome da fazenda para cadastrá-la!'
          }]}>
          <Input autoComplete='dontshow' />
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'cidade']}
          label='Cidade'
          rules={[{
            required: true,
            message: 'Os campos de endereço são obrigatórios para o cadastro!'
          }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'estado']}
          label='Estado'
          rules={[{
            required: true,
            message: 'Os campos de endereço são obrigatórios para o cadastro!'
          }]}>
          <Select placeholder='Estado'>
            {estados.map((estado) => <Select.Option key={estado} name={estado.toLocaleLowerCase()}>{estado}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'culturas']}
          label='Culturas'
          rules={[{
            required: true,
            message: 'É nescessário inserir a cultura desta fazenda'
          }]}>
          <Input />
        </Form.Item>

      </Col>
      <Col xs={24} sm={24} md={12} style={{ paddingRight: 20 }}>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'area']}
          label='Área'
          initialValue={0}
          rules={[{
            required: true,
            validator: (_, value) =>
              value >= (form.getFieldValue('fazenda ' + (fazenda.id ? fazenda.id : index).toString()).area_consolidada + form.getFieldValue('fazenda ' + (fazenda.id ? fazenda.id : index).toString()).area_legal) ?
                Promise.resolve() : Promise.reject('Os valores das Areas da fazenda não podem ser maiores que o valor da Área total')
          }]}
        >
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'area_consolidada']}
          label='Área Consolidade'
          initialValue={0}
          rules={[{
            required: true,
            message: 'o Valor da Área Consolidada e obrigatório'
          }]}
        >
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        <Form.Item
          name={['fazenda ' + (fazenda.id ? fazenda.id : index).toString(), 'area_legal']}
          label='Área Legal'
          initialValue={0}
          rules={[{
            required: true,
            message: 'o Valor da Área Legal e obrigatório'
          }]}
        >
          <InputNumber style={{ width: '100% ' }} />
        </Form.Item>

        {
          fazenda.id ?
            <Popconfirm
              placement='top'
              style={{ backgroundColor: '#f00' }}

              okText="Sim"
              cancelText="Não"
              title="Você tem certeza que deseja apagar?"

              onConfirm={() => handleRemoverExistingFazenda(fazenda)}
            >
              <DeleteOutlined style={{ fontSize: '22px', marginLeft: '10px', marginTop: '15px', cursor: 'pointer' }} />
            </Popconfirm>
            :
            <MinusCircleOutlined
              onClick={() => handleRemoverFazenda(index)}
              style={{ fontSize: '22px', marginLeft: '10px', marginTop: '15px', cursor: 'pointer' }}
            />

        }

      </Col>
      <div style={{ border: '1px solid #f0f0f0', width: '100%' }}></div>
    </Row>
  )

}

export default fazendaForm;
