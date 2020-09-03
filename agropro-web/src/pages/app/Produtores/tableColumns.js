import React from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const tableColumns = [
  {
    fixed: 'left',
    width: 150,
    title: 'Cpf / Cnpj',
    dataIndex: 'cpfCnpj',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.cpfCnpj - b.cpfCnpj
  },
  {
    title: 'Nome',
    dataIndex: 'nome'
  },
  {
    fixed: 'right',
    title: 'Ações',
    key: 'actions',
    width: 120,
    render: () => (
      <>
        <EditOutlined
          style={{
            fontSize: 20,
            cursor: 'pointer'
          }}
        />
        <DeleteOutlined
          style={{
            fontSize: 20,
            marginLeft: 5,
            cursor: 'pointer'
          }}
        />
      </>
    ),
  },
];

export default tableColumns;
