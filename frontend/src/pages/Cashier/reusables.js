import React from 'react';
import { format, parseISO } from 'date-fns';
import formatCash from '~/utils/formatCash';

const types = {
  in: 'Entrada',
  out: 'Retirada',
  open: 'Abertura',
  close: 'Fechamento',
};

const columns = () => [
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <a>{types[type]}</a>,
  },
  {
    title: 'Valor',
    dataIndex: 'amount',
    key: 'amount',
    render: (price) => (price ? formatCash(price) : '---'),
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
    render: (description) =>  description || '---',
  },
  {
    title: 'Data',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date) => format(parseISO(date), 'dd/MM/yyyy HH:mm:ss'),
  },
];

export { columns };
