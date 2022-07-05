import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Space,
} from 'antd';
import { useProduct } from '~/context/product';
import { formatNumber, parserNumber } from '~/utils/currencyMask';

const ProductDrawer = () => {
  const [initialValues, setInitialValues] = useState({});

  const {
    open,
    current,
    setCurrent,
    closeDrawer,
    actionType,
    onSubmit,
    form,
  } = useProduct();

  const onFinish = (values) => {
    onSubmit(values);
  };

  useEffect(() => {
    if (current && actionType === 'update') {
      form.setFieldsValue(current);
    }
  }, [open, actionType, current, form]);

  return (
    <Drawer
      title={
        actionType === 'create'
          ? 'Criar'
          : `Atualizar ${current && current.name}`
      }
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
      <Form
        layout="vertical"
        hideRequiredMark
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
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
              <InputNumber
                placeholder="Ex: 50,00"
                formatter={(value) => formatNumber(value)}
                parser={(value) => parserNumber(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="cost_price" label="Preço de custo">
              <InputNumber
                placeholder="Ex: 50,00"
                formatter={(value) => formatNumber(value)}
                parser={(value) => parserNumber(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          {actionType === 'update' ? (
            <Col span={12}>
              <Form.Item label="Desabilitado" name="disabled">
                <Switch
                  checked={current && current.disabled}
                  onChange={() => {
                    if (current) {
                      setCurrent({ ...current, disabled: !current.disabled });
                    }
                  }}
                />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Form>
    </Drawer>
  );
};

export default ProductDrawer;
