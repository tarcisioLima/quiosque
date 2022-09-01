import React, { useState, useEffect } from 'react';
import { Table, Divider, PageHeader, Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import { columns } from './reusables';
import Drawer from './drawer';
import SaleProvider, { useSale } from '~/context/sale';
import PdfDrawer from './pdfDrawer';
import PayOrderModal from './payOrderModal';
import OrdersTable from './ordersTable';

const Sales = () => {
  const [filteredList, setFilteredList] = useState([]);
  const {
    list,
    openNewOrder,
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
          </Button>
        ]}
      ></PageHeader>

      <Drawer/>
      <PdfDrawer/>
      <PayOrderModal />

      <Divider orientation="left"></Divider>
      <OrdersTable />

    </div>
  );
};

const SaleWithProvider = () => (
  <SaleProvider>
    <Sales />
  </SaleProvider>
);

export default SaleWithProvider;
