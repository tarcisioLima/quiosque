import api from '~/services/api';
import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Typography, Col, Row, Statistic } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  const [totalTables, setTotalTables] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchTables = useCallback(async () => {
    const response = await api.get('table');
    if(response) {
      setTotalTables(response.data.filter((_t) => _t.status !== 'blocked').length)
    }
  }, [api]);

  const fetchProducts = useCallback(async () => {
    const response = await api.get('products');
    if(response) {
      setTotalProducts(response.data.length)
    }
  }, [api]);

  useEffect(() => {
    fetchTables();
    fetchProducts();
  }, []);


  return (
    <div>
      <Title>Dashboard - Início</Title>
      <Divider />
      <Row gutter={16}>
        <Col span={3}>
          <Statistic title="Produtos Registrados" value={totalProducts} />
        </Col>
        <Col span={3}>
          <Statistic title="Mesas disponíveis" value={totalTables} />
        </Col>
        {/* <Col span={3}>
          <Statistic title="Turno Atual Aberto" value="Matutino" />
        </Col> */}
      </Row>
      <Divider />
    </div>
    )
}

export default Dashboard;
