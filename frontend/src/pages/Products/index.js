import React, { useState, useEffect } from 'react';
import { Table, Divider, PageHeader, Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { columns } from './reusables';
import Drawer from './drawer';
import ProductProvider, { useProduct } from '~/context/product';

const Products = () => {
  const [value, setValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const {
    list,
    loading,
    openNewProduct,
    openUpdateProduct,
    remove,
  } = useProduct();

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Produtos"
        subTitle="Listar, Criar, Atualizar e Remover"
        extra={[
          <Button key="1" type="primary" onClick={() => openNewProduct()}>
            <PlusCircleOutlined /> Adicionar Produto
          </Button>,
        ]}
      ></PageHeader>

      <Drawer />

      <Divider orientation="left">Listagem</Divider>
      <Input
        placeholder="Buscar por nome"
        value={value}
        style={{ height: 45 }}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(currValue);
          const filteredData = list.filter((entry) =>
            entry.name
              .toLocaleLowerCase()
              .includes(currValue.toLocaleLowerCase())
          );
          setFilteredList(filteredData);
        }}
      />
      <br />
      <Divider orientation="left"></Divider>
      <Table
        filterSearch
        columns={columns(openUpdateProduct, remove)}
        loading={loading}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={filteredList}
      />
    </div>
  );
};

const ProductWithProvider = () => (
  <ProductProvider>
    <Products />
  </ProductProvider>
);

export default ProductWithProvider;
