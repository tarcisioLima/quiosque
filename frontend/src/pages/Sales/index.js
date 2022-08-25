import React, { useState, useEffect } from 'react';
import { Table, Divider, PageHeader, Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import { columns } from './reusables';
import Drawer from './drawer';
import SaleProvider, { useSale } from '~/context/sale';

const Sales = () => {
  const [value, setValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const {
    list,
    loading,
    openNewOrder,
    openUpdateProduct,
    fetchTables,
    remove,
  } = useSale();

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Vendas"
        subTitle="Vendas Avulsa, Venda à Mesa"
        extra={[
          <Button key="1" type="primary" onClick={() => openNewOrder()}>
            <PlusCircleOutlined /> Nova Venda
          </Button>,
        ]}
      ></PageHeader>

      <Drawer/>
    
      <Divider orientation="left"></Divider>
    
    </div>
  );
};

const SaleWithProvider = () => (
  <SaleProvider>
    <Sales />
  </SaleProvider>
);

export default SaleWithProvider;
