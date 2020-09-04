import React from 'react';

import {
  Row,
  Col,
  Card,
  Table
} from 'antd';

import tableColumns from './tableColumns';
import tableFazendaColumns from './tableFazendaColumns';

const Produtores = ({ setRoute }) => {

  const data = [{ id: 1, cpfCnpj: 123123124, nome: 'Guzin', fazendas: [{ id: 1, nome: 'Fazenda tal', area: 123123123, area_consolidade: 123213, area_legal: 12312 }, { id: 2, nome: 'Fazenda tal', area: 123123123, area_consolidade: 123213, area_legal: 12312 }, { id: 3, nome: 'Fazenda tal', area: 123123123, area_consolidade: 123213, area_legal: 12312 },] }, { id: 2, cpfCnpj: 223123124, nome: 'Guizin', fazendas: [] }, { id: 3, cpfCnpj: 323123124, nome: 'Jozin', fazendas: [] },]

  const handleAdicionarProdutor = () => setRoute('AdicionarProdutor');

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

            columns={tableColumns}
            dataSource={data}

            scroll={{ x: true }}

            pagination={{
              position: ['bottomCenter'],
              hideOnSinglePage: true
            }}

            expandable={{
              expandedRowRender: (row) => (
                <Table
                  rowKey={(row) => row.id}

                  columns={tableFazendaColumns}
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
