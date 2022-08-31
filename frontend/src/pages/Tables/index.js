import React, { useState, useEffect } from 'react';
import { Card, Divider, PageHeader, Button, Typography, Col, Row, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import Drawer from './drawer';
import SaleProvider, { useSale } from '~/context/sale';

const { Title } = Typography;

const Tables = () => {
  const {
    tables,
    openNewOrder,
  } = useSale();


  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Mesas"
        subTitle="Criar, Atualizar, Remover"
        extra={[
          <Button key="1" type="primary" onClick={() => openNewOrder()}>
            <PlusCircleOutlined /> Criar Mesa
          </Button>
        ]}
      ></PageHeader>

      <Drawer/>

      {/* <Divider orientation="left"><Title level={3}>Listagem</Title></Divider> */}
      
      <Divider>
        <Tag color="red">BLOQUEADO</Tag>
        <Tag color="green">LIVRE</Tag>
        <Tag color="blue">ABERTO</Tag>
      </Divider>

      <br/>

      <div className='card-deck'>
        <Row gutter={16}>
          {tables.map((_table) =>
            <Col span={6}>
              <Card
                title={_table.name}
                style={{
                  width: '100%',
                  marginBottom: 15
                }}
                actions={[
                  <SettingOutlined key="setting" />
                ]}
              >
                <div>
                  <Tag
                      style={{
                        textTransform: 'uppercase'
                      }}
                      color={_table.status === 'free' ? 'green' : _table.status === 'blocked' ? 'red' : 'blue'}>{_table.status_label}
                    </Tag>

                    <Divider orientation='left'></Divider>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </div>
     

    </div>
  );
};

const TableWithProvider = () => (
  <SaleProvider>
    <Tables />
  </SaleProvider>
);

export default TableWithProvider;
