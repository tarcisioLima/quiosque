import React, { useState, useMemo } from 'react';
import { Space, Table, Typography, Select, Divider } from 'antd';
import { useSale } from '~/context/sale';
import formatCash from '~/utils/formatCash';
import { format } from 'date-fns';

const { Option } = Select;
const { Title } = Typography;

const columns = ({ viewNote, payOrder, openUpdateOrder }) => [
   {
    title: 'Código',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Nome cliente',
    dataIndex: 'customer_name',
    key: 'customer_name',
    responsive: ['lg'],
  },
  {
    title: 'Tipo',
    dataIndex: 'type_label',
    key: 'type_label',
    responsive: ['lg'],
    width: 100,
  },
  {
    title: 'Status',
    dataIndex: 'status_label',
    key: 'status_label',
    responsive: ['lg'],
    width: 100,
  },
  {
    title: 'Total em produtos',
    dataIndex: 'products',
    key: 'products',
    responsive: ['lg'],
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
     width: 100,
    render: (value) => {
        return value || '---'
    }
  },
  {
    title: 'Mesa',
    dataIndex: 'tables',
    key: 'tables',
    render: (tables) => {
        return tables.length > 0 ? tables[0].name : '---'
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
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 150,
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
    const [currentStatus, setCurrentStatus] = useState('all');

    const filteredOrders = useMemo(() => {
      if(currentStatus === 'all'){
        return orders;
      }
      return orders.filter((_order) => _order.status === currentStatus);
    }, [orders, currentStatus]);


    const viewNote = (order) => {
        openPFFOrder(order)
    }

    const payOrder = (order) => {
      triggerOpenPayModal(order);
    }

    return (
        <>
            <Select placeholder="Status" style={{ width: 120 }} onChange={(v) => setCurrentStatus(v)}>
              <Option value="all">Todos</Option>
              <Option value="open">Aberta</Option>
              <Option value="paid">
                Pago
              </Option>
            </Select>

            <Divider> <Title level={3}>Comandas</Title></Divider>

            <Table 
              scroll={{ x: 1600 }} 
              columns={columns({viewNote, payOrder, openUpdateOrder })} 
              dataSource={filteredOrders} />
        </>
    )
}

export default OrdersTable;