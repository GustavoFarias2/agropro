import React from 'react';

import {
  Row,
  Col,
  Card,
  Table
} from 'antd';

import tableColumns from './tableColumns';

const Produtores = ({ setRoute }) => {

  const data = [{ id: 1, cpfCnpj: 123123124, nome: 'Guzin', fazendas: [] }, { id: 2, cpfCnpj: 223123124, nome: 'Guizin', fazendas: [] }, { id: 3, cpfCnpj: 323123124, nome: 'Jozin', fazendas: [] },]

  const handleAdicionarProdutor = () => setRoute('AdicionarProdutor');

  return (
    <Row
      justify='center'
      align='middle'
      style={{ padding: 20, paddingTop: 30 }}
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

            columns={tableColumns}
            dataSource={data}

            pagination={{ position: ['bottomCenter'] }}

            expandable={{
              expandedRowRender: () => (
                <Table
                  columns={tableColumns}
                />
              ),
              rowExpandable: (row) => row.fazendas.length !== 0,
            }}
          />

        </Card>

      </Col>
    </Row>
  )

}

export default Produtores;
