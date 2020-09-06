import React, { useEffect, useState, useCallback } from 'react';

import api from '../../../../services/api';

import { useSelector, useDispatch } from 'react-redux';
import { produtoresActions } from '../../../../reducers/produtores';

import { validate } from 'gerador-validador-cpf';
import validarCNPJ from '../../../../functions/validarCNPJ';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Switch,
  Button,
  message,
  Tooltip
} from 'antd';

import {
  MaskedInput
} from 'antd-mask-input'

import { PlusCircleOutlined } from '@ant-design/icons';

import FazendaForm from './fazendaForm';

const AdicionarProdutores = ({ setRoute, formId, setFormId }) => {

  const produtor = useSelector((state) => state.produtores.find((produtor) => produtor.id === formId));

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [fazendas, setFazendas] = useState(produtor ? produtor.fazendas : [0]);

  const [cpfCnpjMask, setCpfCnpjMask] = useState('111.111.111-11');

  const [submiting, setSubmiting] = useState(false);


  const changeMask = useCallback(() => {

    cpfCnpjMask === '111.111.111-11' ? setCpfCnpjMask('11.111.111/1111-11') : setCpfCnpjMask('111.111.111-11');

    form.resetFields(['cpf_cnpj']);

  }, [cpfCnpjMask, setCpfCnpjMask, form]);

  useEffect(() => {

    if (produtor) {
      let formData = produtor;
      produtor.fazendas.forEach((fazenda, i) => {
        formData['fazenda ' + i] = fazenda;
      });

      form.setFieldsValue(formData);

      if (produtor.cpf_cnpj.split('').length > 12)
        changeMask();
    }

  }, [produtor, form, changeMask]);

  const handleVoltar = (inserted = false) => {

    if (inserted) {
      message.destroy();
      const hide = message.success('Informações cadastradas com sucesso!');
      setTimeout(hide, 2000);
    }

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

  const handleRemoverExistingFazenda = async (fazenda, i) => {
    setFazendas(fazendas.filter((_, index) => i !== index));

    const response = await api.delete('fazenda/' + fazenda.id);

    if (response.status === 204) {
      dispatch(produtoresActions.REMOVE_FAZENDA(fazenda));

      message.destroy();
      const hide = message.success('Fazenda removida');
      setTimeout(hide, 1500);
    }
  }

  const handleCofirm = async (values) => {

    setSubmiting(true);
    message.loading('Validando informações');

    const produtor = {
      cpf_cnpj: values.cpf_cnpj,
      nome: values.nome
    }

    let validateResult = false;

    if (cpfCnpjMask === '111.111.111-11')
      validateResult = validate(produtor.cpf_cnpj);
    else
      validateResult = validarCNPJ(produtor.cpf_cnpj);

    if (!validateResult) {

      message.destroy();
      const hide = message.warning('o CPF ou CNPJ inserido não é valido!');
      setSubmiting(false);
      setTimeout(hide, 2500);

    }
    else {

      const fazendas = Object.entries(values)
        .filter(([key]) => key.split('fazenda').length > 1)
        .map((fazenda) => fazenda[1]);

      if (!formId) {
        const response = await api.post('produtor', { produtor, fazendas });

        if (response.status === 200) {
          dispatch(produtoresActions.ADD_PRODUTOR(response.data));

          handleVoltar(true);
        }
        else if (response.status === 303) {
          message.destroy();
          const hide = message.warning('Já existe um Produtor com este CPF ou CNPJ no sistema!');

          setSubmiting(false);
          setTimeout(hide, 2500);
        }
      }
      else {
        const response = await api.put('produtor/' + formId, produtor);

        if (response.status === 200) {
          dispatch(produtoresActions.UPDATE_PRODUTOR(response.data));

          handleVoltar(true);
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

                <Tooltip
                  title='Você pode alterar de CPF para CNPJ aqui!'

                  placement='right'
                  arrowPointAtCenter
                  defaultVisible={!produtor}
                >
                  <Switch
                    onClick={() => changeMask()}
                    checked={cpfCnpjMask !== '111.111.111-11'}
                    style={{ marginBottom: '10px' }}
                    disabled={produtor}
                  />
                </Tooltip>
                <Form.Item
                  name='cpf_cnpj'
                  label={cpfCnpjMask === '111.111.111-11' ? 'CPF' : 'CNPJ'}
                  rules={[{
                    required: true,
                    max: 18,
                    message: 'CPF ou CNPJ são nescessarios para a conclusão do cadastro'
                  }]}
                >
                  <MaskedInput
                    mask={cpfCnpjMask}
                    style={{ width: '100%' }}
                    disabled={produtor}
                  />
                </Form.Item>

                <Form.Item name='nome' label='Nome' rules={[{
                  required: true,
                  message: 'É nescessário o Nome do produtor para efutar o cadastro'
                }]}>
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
                handleRemoverExistingFazenda={handleRemoverExistingFazenda}
              />)}

          </Form>
        </Card>

      </Col>
    </Row>
  )

}

export default AdicionarProdutores;
