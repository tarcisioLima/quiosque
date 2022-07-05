import React, { useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useProduct } from '~/context/product';

const ProductDrawer = () => {
  const { open, current, closeDrawer, actionType, onSubmit } = useProduct();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('ON FINISH: ', values);
    onSubmit(values);
  };

  return (
    <Drawer
      title={actionType === 'create' ? 'Criar' : `Atualizar ${current.name}`}
      width={720}
      onClose={closeDrawer}
      visible={open}
      placement={'left'}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeDrawer}>Cancelar</Button>
          <Button onClick={() => form.submit()} type="primary">
            {actionType === 'create' ? 'Criar Produto' : 'Atualizar Produto'}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nome do produto"
              rules={[
                { required: true, message: 'Por favor, adicione um nome' },
              ]}
            >
              <Input placeholder="Ex: Coca-cola lata..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sell_price"
              label="Preço de Venda"
              rules={[
                {
                  required: true,
                  message: 'Por favor, adicione um preço de venda',
                },
              ]}
            >
              <Input placeholder="Ex: 50,00" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="cost_price" label="Preço de custo">
              <Input placeholder="Ex: 50,00" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ProductDrawer;
