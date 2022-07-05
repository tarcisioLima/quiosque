import React from 'react';
import { Divider, Typography, Col, Row, Statistic } from 'antd';
const { Title } = Typography;
const Dashboard = () => (
  <div>
    <Title>Dashboard - Início</Title>
    <Divider />
    <Row gutter={16}>
      <Col span={3}>
        <Statistic title="Produtos Registrados" value={10} />
      </Col>
      <Col span={3}>
        <Statistic title="Mesas disponíveis" value={10} />
      </Col>
      <Col span={3}>
        <Statistic title="Turno Atual Aberto" value="Matutino" />
      </Col>
    </Row>
    <Divider />
  </div>
);

export default Dashboard;
