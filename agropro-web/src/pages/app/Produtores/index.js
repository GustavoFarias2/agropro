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

const Produtores = ({ setRoute, setFormId }) => {

  const produtores = useSelector((state) => state.produtores);

  const dispatch = useDispatch();

  useEffect(() => {

    const getProdutores = async () => {

      const response = await api.get('produtor');

      if (response.status === 200)
        dispatch(produtoresActions.LOAD_PRODUTORES(response.data));

    }

    getProdutores();

  }, [dispatch]);

  const routeToForm = () => setRoute('AdicionarProdutor');

  const handleEditProdutor = (row) => {

    setFormId(row.id);

    routeToForm();

  }

  const handleDeleteProdutor = async (row) => {

    const response = await api.delete('produtor/' + row.id);

    if (response.status === 204)
      dispatch(produtoresActions.REMOVE_PRODUTOR(row))


  }

  const handleDeleteFazenda = () => {

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
              onClick={() => routeToForm()}
              style={{ cursor: 'pointer', color: '#1890ff' }}
            >
              Adicionar Produtor
            </span>
          }
        >

          <Table
            rowKey={(row) => row.id}

            columns={tableColumns(handleEditProdutor, handleDeleteProdutor)}
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

                  columns={tableFazendaColumns(handleEditProdutor, handleDeleteFazenda)}
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
