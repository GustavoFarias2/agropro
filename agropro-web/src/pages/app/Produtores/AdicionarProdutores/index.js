import React, { useEffect, useState } from 'react';

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
  const [formLoaded, setFormLoaded] = useState(false);

  const [fazendas, setFazendas] = useState(produtor ? produtor.fazendas : [0]);

  const [cpfCnpjMask, setCpfCnpjMask] = useState((produtor && produtor.cpf_cnpj.split('').length > 15) ? '11.111.111/1111-11' : '111.111.111-11');

  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {

    if (produtor && !formLoaded) {

      setFormLoaded(true);

      let formData = produtor;

      produtor.fazendas.forEach((fazenda, i) => formData['fazenda ' + (fazenda.id ? fazenda.id : i).toString()] = fazenda);

      form.setFieldsValue(formData);

    }

  }, [produtor, form, formLoaded]);

  const handleVoltar = (inserted = false) => {

    if (inserted) {
      message.destroy();
      const hide = message.success('Informações cadastradas com sucesso!');
      setTimeout(hide, 2000);
    }

    setFormId(null);
    setRoute('Produtores');

  }

  const changeMask = () => {
    cpfCnpjMask === '111.111.111-11' ? setCpfCnpjMask('11.111.111/1111-11') : setCpfCnpjMask('111.111.111-11');
    form.resetFields(['cpf_cnpj']);
  }

  const handleAdicionarFazenda = () => {

    if (fazendas.length > 0)
      setFazendas([...fazendas, fazendas[fazendas.length - 1] + 1]);
    else
      setFazendas([0]);

  }

  const handleRemoverFazenda = (index) => setFazendas(fazendas.filter((_, i) => index !== i));

  const handleRemoverExistingFazenda = async (removedFazenda) => {

    const newFazendasArray = fazendas.filter((fazenda) => removedFazenda.id !== fazenda.id);
    
    setFazendas(newFazendasArray);

    const response = await api.delete('fazenda/' + removedFazenda.id);

    if (response.status === 204) {
      dispatch(produtoresActions.REMOVE_FAZENDA(removedFazenda));

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

        await fazendas.forEach((fazenda) => {
          if (fazenda.id)
            api.put('fazenda/' + fazenda.id, fazenda);
          else {
            fazenda.produtor_id = formId;
            api.post('fazenda', fazenda);
          }
        });
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
            autoComplete='dontshow'
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
                    disabled={produtor && formLoaded}
                  />
                </Form.Item>

                <Form.Item name='nome' label='Nome' rules={[{
                  required: true,
                  message: 'É nescessário o Nome do produtor para efutar o cadastro'
                }]}>
                  <Input autoComplete='dontshow' />
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
