import React, { useState, useCallback, useEffect } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
import { columns } from './reusables';
import api from '~/services/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Produtos</h2>
      <Table
        columns={columns}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={products}
      />
    </div>
  );
};

export default Products;
