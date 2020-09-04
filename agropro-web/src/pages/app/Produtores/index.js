import React, { useEffect } from 'react';

import { produtoresActions } from '../../../reducers/produtores';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../../services/api';

import {
  Row,
  Col,
  Card,
  Table
} from 'antd';

import tableColumns from './tableColumns';
import tableFazendaColumns from './tableFazendaColumns';

const Produtores = ({ setRoute }) => {

  const produtores = useSelector((state) => state.produtores);

  const dispatch = useDispatch();

  useEffect(() => {

    const getProdutores = async () => {

      const response = await api.get('produtor');

      if (response.status === 200)
        dispatch(produtoresActions.LOAD_PRODUTORES(response.data));

    }

    getProdutores();

  }, []);

  const handleAdicionarProdutor = () => setRoute('AdicionarProdutor');

  const handleDeleteProdutor = () => {

    dispatch(produtoresActions.REMOVE_PRODUTOR({
      id: 1,
      cpfCnpj: 12312312,
      nome: 'Guzin',
      fazendas: []
    }))

  }

  return (
    <Row
      justify='center'
      align='middle'
      style={{ paddingTop: 30 }}
    >
      <Col span={24}>

        <Card
          title='Produtores'
          bodyStyle={{ paddingRight: 0, paddingLeft: 0 }}
          extra={
            <span
              onClick={() => handleAdicionarProdutor()}
              style={{ cursor: 'pointer', color: '#1890ff' }}
            >
              Adicionar Produtor
            </span>
          }
        >

          <Table
            rowKey={(row) => row.id}

            columns={tableColumns(() => { }, handleDeleteProdutor)}
            dataSource={produtores}

            scroll={{ x: true }}

            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true
            }}

            expandable={{
              expandedRowRender: (row) => (
                <Table
                  rowKey={(row) => row.id}

                  columns={tableFazendaColumns(() => { }, () => { })}
                  dataSource={row.fazendas}

                  scroll

                  pagination={{ hideOnSinglePage: true }}
                />
              ),

              rowExpandable: ({ fazendas }) => fazendas.length !== 0,
            }}
          />

        </Card>

      </Col>
    </Row>
  )

}

export default Produtores;
