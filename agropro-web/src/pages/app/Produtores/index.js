import React from 'react';

import {
  Row,
  Col,
  Card,
  Table
} from 'antd';


const Produtores = () => {

  const columns = [
    {
      title: 'Cpf / Cnpj',
      dataIndex: 'cpfCnpj',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.cpfCnpj - b.cpfCnpj
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      sorter: (a, b) => a.name.length - b.name.length
    }
  ];

  const data = [
    {
      id: 1,
      cpfCnpj: 123123124,
      nome: 'Guzin',
      fazendas: []
    }
  ]

  return (
    <Row
      justify='center'
      align='middle'
      style={{ padding: 20, paddingTop: 50 }}
    >
      <Col
        md={22}
        sm={24}
      >

        <Card title='Produtores'>

          <Table
            rowKey={(row) => row.id}
          
            columns={columns}
            dataSource={data}

            expandable={{
              expandedRowRender: () => (
                <Table
                  columns={columns}
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
