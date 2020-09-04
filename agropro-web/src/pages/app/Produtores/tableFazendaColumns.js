import React from 'react';

import { Popconfirm, Col } from 'antd';

import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const tableColumns = [
  {
    title: 'Ações',
    key: 'actions',
    width: 10,
    render: () => (
      <Col style={{ textAlign: 'center' }}>

        <EditOutlined style={{ fontSize: 20, cursor: 'pointer' }} />

        <Popconfirm
          placement='topLeft'
          style={{ left: '64px' }}

          okText="Sim"
          cancelText="Não"
          title="Você tem certeza que deseja apagar?"
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
    title: 'Nome',
    dataIndex: 'nome'
  },
  {
    title: 'Área total',
    dataIndex: 'area'
  },
  {
    title: 'Área Consolidada',
    dataIndex: 'area_consolidada'
  },
  {
    title: 'Área Legal',
    dataIndex: 'area_legal'
  }
];

export default tableColumns;
