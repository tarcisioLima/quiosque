import { Button } from 'antd';
import React from 'react';
import { DeleteFilled } from '@ant-design/icons';
import formatCash from '~/utils/formatCash';

export const columnsOrderProduct = (remove) => [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Quantidade',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    {
      title: 'Valor Unitário',
      dataIndex: 'sell_price',
      key: 'sell_price',
      render: (value) => formatCash(value)
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, r, index) => (
        <Button type='primary' onClick={() => remove(index)} danger>
         <DeleteFilled/>
        </Button>
      ),
    },
  ];

  export const columnsProduct = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Quantidade',
        dataIndex: 'order_product',
        key: 'order_product',
        render: (order_product) => order_product.quantity
      },
    {
      title: 'Valor Unitário',
      dataIndex: 'sell_price',
      key: 'sell_price',
      render: (value) => formatCash(value)
    },
  ];