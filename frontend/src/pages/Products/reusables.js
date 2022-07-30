import React from 'react';
import { Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import formatCash from '~/utils/formatCash';

const columns = (update, remove) => [
  {
    title: 'Código',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a onClick={() => update(record)}>{text}</a>,
  },
  {
    title: 'Preço de venda',
    dataIndex: 'sell_price',
    key: 'sell_price',
    render: (price) => (price ? formatCash(price) : '---'),
  },
  {
    title: 'Preço de custo',
    dataIndex: 'cost_price',
    key: 'cost_price',
    render: (price) => (price ? formatCash(price) : '---'),
  },
  {
    title: 'Data de criação',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm:ss'),
  },
  {
    title: 'Data de atualização',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm:ss'),
  },
  {
    title: 'Desabilitado?',
    dataIndex: 'disabled',
    key: 'disabled',
    render: (disabled) => (disabled ? 'SIM' : 'NÃO'),
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button color="secondary" onClick={() => update(record)}>
          <EditOutlined />
          Atualizar
        </Button>
        <Button type="danger" onClick={() => remove(record.id)}>
          <DeleteOutlined />
          Excluir
        </Button>
      </Space>
    ),
  },
];

export { columns };
