import React from 'react';

import { Popconfirm, Col } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const tableColumns = (onEdit, onDelete) => [
  {
    title: 'Ações',
    key: 'actions',
    width: 10,
    render: (_, row) => (
      <Col style={{ textAlign: 'center' }}>

        <EditOutlined
          style={{ fontSize: 20, cursor: 'pointer' }}
          onClick={() => onEdit(row)}
        />

        <Popconfirm
          placement='topLeft'
          style={{ backgroundColor: '#f00' }}

          okText="Sim"
          cancelText="Não"
          title="Você tem certeza que deseja apagar?"

          onConfirm={() => onDelete(row)}
        >
          <DeleteOutlined
            style={{
              fontSize: 20,
              cursor: 'pointer'
            }}
          />
        </Popconfirm>

      </Col>
    ),
  },
  {
    width: 150,
    title: 'Cpf / Cnpj',
    dataIndex: 'cpfCnpj',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.cpfCnpj - b.cpfCnpj
  },
  {
    title: 'Nome',
    dataIndex: 'nome'
  }
];

export default tableColumns;
