import React, { useEffect, useState, useMemo } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Switch,
  Select,
  Space,
} from 'antd';
import { useSale } from '~/context/sale';
import { formatNumber, parserNumber } from '~/utils/currencyMask';

const { Option } = Select;

const initVals = {
  customer_name: '',
  type: '',
}

const SaleDrawer = () => {
  const [initialValues, setInitialValues] = useState(initVals);

  const {
    open,
    current,
    setCurrent,
    closeDrawer,
    actionType,
    onSubmit,
    form,
    tables,
  } = useSale();

  const onFinish = (values) => {
    onSubmit(values);
  };

  const tableOptions = useMemo(() => {
    const filtered = tables.filter((_t) => _t.status !== 'blocked')
    return filtered;
  }, [tables]);

  useEffect(() => {
    if (current && actionType === 'update') {
      form.setFieldsValue(current);
    }
  }, [open, actionType, current, form]);

  return (
    <Drawer
      title={
        actionType === 'create'
          ? 'Criar comanda'
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
            {actionType === 'create' ? 'Nova Venda' : 'Atualizar Venda'}
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
              name="customer_name"
              label="Nome do cliente"
              rules={[
                { required: true, message: 'Por favor, adicione um nome' },
              ]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
                name="type"
                label="Tipo"
                rules={[
                {
                    required: true,
                    message: 'Escolha uma opção!',
                },
                ]}
            >
                <Radio.Group>
                <Radio.Button value="single">Avulso</Radio.Button>
                <Radio.Button value="table">Mesa</Radio.Button>
                <Radio.Button value="sand">Areia</Radio.Button>
                <Radio.Button value="other">Outro</Radio.Button>
                </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
                name="table"
                label="Mesas disponíveis"
                rules={[
                  {
                      required: true,
                      message: 'Escolha uma mesa!',
                  },
                  ]}
            >
                 <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Por favor selecione a mesa(s)"
                    defaultValue={[]}
                    >
                    {tableOptions.map((_t) => 
                        <Option value={_t.id} key={_t.id}>Mesa: {_t.name} - Status: {_t.status_label} - Tipo: {_t.type_label}</Option>)}
                </Select>
            </Form.Item>
          </Col>
          {actionType === 'update' ? (
          <Col span={12}>
            <Form.Item
              name="discount_amount"
              label="Desconto"
            >
              <InputNumber
                placeholder="Ex: 10,00"
                formatter={(value) => formatNumber(value)}
                parser={(value) => parserNumber(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>) : null }

          {/* {actionType === 'update' ? (
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
          ) : null} */}
        </Row>
      </Form>
    </Drawer>
  );
};

export default SaleDrawer;
