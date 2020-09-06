import React, { useEffect, useState } from 'react';

import api from '../../../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { produtoresActions } from '../../../../reducers/produtores';

import { validate } from 'gerador-validador-cpf';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message
} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

import FazendaForm from './fazendaForm';

const AdicionarProdutores = ({ setRoute, formId, setFormId }) => {

  const produtor = useSelector((state) => state.produtores.find((produtor) => produtor.id === formId));

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [fazendas, setFazendas] = useState(produtor ? produtor.fazendas : [0]);

  const [submiting, setSubmiting] = useState(false);
  const [validating, setValidating] = useState(false);

  useEffect(() => {

    if (produtor)
      produtor.fazendas.forEach((fazenda, i) => {
        // form.setFields({
        //   name: 'fazenda ' + i,
        //   values: fazenda
        // })
      });

  }, [produtor]);

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

    setSubmiting(true);
    message.loading('Validando informações');

    const produtor = {
      cpf_cnpj: values.cpf_cnpj,
      nome: values.nome
    }

    let validateResult = false;
    if (produtor.cpf_cnpj)
      validateResult = validate(produtor.cpf_cnpj)

    if (!validateResult) {

      message.destroy();
      const hide = message.warning('o CPF inserido não é valido!');
      setSubmiting(false);
      setTimeout(hide, 2500);

    }
    else {

      const fazendas = Object.entries(values)
        .filter(([key]) => key.split('fazenda').length > 1)
        .map((fazenda) => fazenda[1]);

      if (!formId) {
        const response = await api.post('produtor', {
          produtor,
          fazendas
        });

        if (response.status === 200) {
          dispatch(produtoresActions.ADD_PRODUTOR(response.data));

          handleVoltar();
        }
        else if (response.status === 303) {
          message.destroy();
          const hide = message.warning('Já existe um Produtor com este nome no sistema!');
          setSubmiting(false);
          setTimeout(hide, 2500);
        }
      }
      else {
        const response = await api.put('produtor/' + formId, produtor);

        if (response.status === 200) {
          dispatch(produtoresActions.UPDATE_PRODUTOR(response.data));

          handleVoltar();
        }
      }

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
            <Row align='middle'>
              <span
                onClick={() => handleVoltar()}
                style={{ cursor: 'pointer', color: '#1890ff', marginRight: '15px' }}
              >
                voltar
              </span>
              <Button
                disabled={submiting}
                onClick={() => form.submit()}
                style={{ cursor: 'pointer', fontWeight: 500, fontSize: '16px' }}
              >
                Confirmar
              </Button>
            </Row>
          }
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={produtor && produtor}
            onFinish={handleCofirm}
          >

            <Row>
              <Col xs={24} sm={24} md={8}>

                <Form.Item
                  name='cpf_cnpj'
                  label='Cpf / Cpnj'
                  rules={[{
                    required: true,
                    max: 18,
                    pattern: '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'  // eslint-disable-line
                  }]}
                >
                  <Input style={{ width: '100%' }} />
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

            {fazendas.map((fazenda, i) =>
              <FazendaForm
                key={i}
                index={i}
                form={form}
                fazenda={fazenda}
                handleRemoverFazenda={handleRemoverFazenda}
              />)}

          </Form>
        </Card>

      </Col>
    </Row>
  )

}

export default AdicionarProdutores;
