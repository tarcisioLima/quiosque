import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
  Divider,
  Select,
  Table,
  Space,
  message,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useSale } from '~/context/sale';
import { formatNumber, parserNumber } from '~/utils/currencyMask';
import formatCash from '~/utils/formatCash';
import noEmptyFields from '~/utils/noEmptyFields';
import api from '~/services/api';

import { columnsOrderProduct } from './reusables';

const { Option } = Select;
const { Title } = Typography

const initVals = {
  customer_name: '',
  type: '',
}

const SaleDrawer = () => {
  const [initialValues, setInitialValues] = useState(initVals);
  const [formValues, setFormValues] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [productOrder, setProductOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const {
    open,
    current,
    fetchTables,
    closeDrawer,
    actionType,
    form,
    tables,
    products,
    fetchOrders,
  } = useSale();

  const onFinish = async (values) => {
    if (actionType === 'create') {
      
      const { table, ...rest } = values;

      const products_id = orderProducts.map((_product) => ({
        id: _product.id,
        quantity: _product.quantity,
      }));

      const payload = noEmptyFields({
        tables_id: table || [],
        products_id,
        ...rest
      })

      console.log('LIXO : ', payload);

      if(values.type === 'single' && orderProducts.length === 0) {
        message.error('Uma venda avulsa precisa necessáriamente de produtos a serem registrados')
        return;
      }

      const response = await api.post('/order', payload);

      if (response) {
        message.success(`Comanda registrada com sucesso!`);
        closeDrawer();
        fetchOrders();
        fetchTables();
      }
    } else if (actionType === 'update') {
      const { id, ...rest } = current;
      const response = await api.put(`/products/${id}`, { ...rest, ...values });
      if (response) {
        message.success(`Comanda atualizada com sucesso!`);
        closeDrawer();
        fetchOrders();
        fetchTables();
      }
    }
  };

  const tableOptions = useMemo(() => {
    const filtered = tables.filter((_t) => _t.status !== 'blocked')
    return filtered;
  }, [tables]);

  const addProductOrder = useCallback(() => {
    if(quantity < 1) { 
      message.error('A quantidade não pode ser negativa')
      return
    }
    if(productOrder === null){
      message.error('Selecione um produto para adicionar')
      return
    }

    const __product = products.filter((_p) => _p.id === productOrder)[0]
    const newProduct = {...__product, quantity}
    const newList = [newProduct, ...orderProducts];

    setOrderProducts(newList);
    setProductOrder(null);
    setQuantity(1);

  }, [products, quantity, productOrder, orderProducts]);

  const removeProductOrder = useCallback((productIndex) => {
    const updated = orderProducts.filter((_, index) => index !== productIndex)
    setOrderProducts(updated)
  }, [orderProducts]);

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
          <Button onClick={() => closeDrawer()}>Cancelar</Button>
          <Button onClick={() => form.submit()} type="primary">
            {actionType === 'create' ? 'Criar Comanda' : 'Atualizar Comanda'}
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
        onValuesChange={(_, values) => setFormValues(values)}
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
            {formValues.type === 'table' ?
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
                            <Option value={_t.id} key={_t.id}>
                              MESA: {_t.name} - STATUS: {_t.status_label} - TIPO: {_t.type_label}
                            </Option>)}
                    </Select>              
                </Form.Item>
              </Col> : null }
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
            </Col>

            <Col span={24}>
              <Divider>
                <Title level={5}>Adicionar produtos a esta comanda</Title>
              </Divider>
            </Col>
          
          {/* ADD PRODUTOS */}
          <Col span={24}>
              <Row gutter={6}>
                <Col span={16}>
                <Form.Item                  
                    label="Buscar produtos"
                  >
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      value={productOrder}
                      onChange={(v) => {
                        console.log('P: ', v)
                        setProductOrder(v)
                      }}
                      placeholder=""
                      optionFilterProp="children"
                      defaultValue={[]}
                      filterOption={(input, option) => {                      
                        const join =  option.children.join('').toLowerCase()
                        return join.toLowerCase().indexOf(input) > -1                      
                      }}
                    >
                      {products.map((_p) => 
                              <Option value={_p.id} key={_p.id}>
                                Código: #{_p.id} | {_p.name} - VALOR: {formatCash(_p.sell_price)}
                              </Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item                  
                      label="Quantidade"
                    >
                      <InputNumber
                        placeholder="1"
                        value={quantity}
                        onChange={(v) => setQuantity(v)}
                        defaultValue={1}
                        formatter={(value) => formatNumber(value)}
                        parser={(value) => parserNumber(value)}
                        style={{ width: '100%' }}
                      />
                  </Form.Item>
                </Col>
              <Col span={4}>
                <Form.Item                  
                      label=" "
                  >
                  <Button type="primary" style={{width: '100%'}} onClick={() => addProductOrder()}>
                    <PlusCircleOutlined />
                  </Button>
                </Form.Item>
              </Col>
              </Row>
            </Col>
           
           {/* TABELA */}
           <Col span={24}>
              <Table columns={columnsOrderProduct(removeProductOrder)} dataSource={orderProducts} />
           </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default SaleDrawer;
