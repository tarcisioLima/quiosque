import React from 'react';
import { Table, Divider, PageHeader, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { columns } from './reusables';
import Drawer from './drawer';
import ProductProvider, { useProduct } from '~/context/product';

const Products = () => {
  const {
    list,
    loading,
    openNewProduct,
    openUpdateProduct,
    remove,
  } = useProduct();

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
      <Table
        columns={columns(openUpdateProduct, remove)}
        loading={loading}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={list}
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
