import React from 'react';
import { Space, Table, Typography } from 'antd';
import { useSale } from '~/context/sale';
import formatCash from '~/utils/formatCash';
import { format } from 'date-fns';

const { Title } = Typography;

const columns = ({ viewNote, payOrder, openUpdateOrder }) => [
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
      const sum = record.products.reduce((acc, curr) => acc+curr.sell_price * curr.order_product.quantity, 0)
      const d = record.discount_amount || 0;
      return formatCash(sum - d);
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
        { record.status !== 'paid' ? <a onClick={() => openUpdateOrder(record)}>Editar</a> : null }
        { record.status !== 'paid' ? <a onClick={() => payOrder(record)}>Finalizar</a> : null }
        { record.status === 'paid' ? <a onClick={() => viewNote(record)}>Visualizar Nota</a> : null }       
      </Space>
    ),
  },
];

const OrdersTable = () => {
    const { orders, openPFFOrder, triggerOpenPayModal, openUpdateOrder } = useSale();

    const viewNote = (order) => {
        openPFFOrder(order)
    }

    const payOrder = (order) => {
      triggerOpenPayModal(order);
    }

    return (
        <>
            <Title level={2}>Comandas</Title>
            <Table columns={columns({viewNote, payOrder, openUpdateOrder })} dataSource={orders} />
        </>
    )
}

export default OrdersTable;