import React from 'react';
import { Space, Table, Typography } from 'antd';
import { useSale } from '~/context/sale';
import formatCash from '~/utils/formatCash';
import { format } from 'date-fns';

const { Title } = Typography;

const columns = ({ viewNote }) => [
   {
    title: 'Código',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nome cliente',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: 'Tipo',
    dataIndex: 'type_label',
    key: 'type_label',
  },
  {
    title: 'Status',
    dataIndex: 'status_label',
    key: 'status_label',
  },
  {
    title: 'Total em produtos',
    dataIndex: 'products',
    key: 'products',
    render: (_, record) => {
        return formatCash(record.products.reduce((acc, curr) => acc+curr.sell_price, 0));
    }
  },
  {
    title: 'Forma Pagamento',
    dataIndex: 'payment_type',
    key: 'payment_type',
    render: (value) => {
        return value || '---'
    }
  },
  {
    title: 'Data criação',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => {
        return format(new Date(value), 'dd/MM/yyyy HH:mm:ss') || '---'
    }
  },
  {
    title: 'Ações',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        { record.status !== 'paid' ? <a>Editar</a> : null }
        { record.status !== 'paid' ? <a>Finalizar</a> : null }
        { record.status === 'paid' ? <a onClick={() => viewNote(record)}>Visualizar Nota</a> : null }       
      </Space>
    ),
  },
];

const OrdersTable = () => {
    const { orders, openPFFOrder } = useSale();

    const viewNote = (order) => {
        openPFFOrder(order)
    }

    return (
        <>
            <Title level={2}>Comandas</Title>
            <Table columns={columns({viewNote})} dataSource={orders} />
        </>
    )
}

export default OrdersTable;