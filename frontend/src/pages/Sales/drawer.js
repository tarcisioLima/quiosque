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
  Tooltip,
  message,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useSale } from '~/context/sale';
import { formatNumber, parserNumber } from '~/utils/currencyMask';
import formatCash from '~/utils/formatCash';
import noEmptyFields from '~/utils/noEmptyFields';
import objectOnlyWantedKeys from '~/utils/objectOnlyWantedKeys';
import api from '~/services/api';

import { columnsOrderProduct, getByIdInList } from './reusables';

const { Option } = Select;
const { Title } = Typography

const initVals = {
  customer_name: '',
  type: '',
  transfer_to: '',
  discount_amount: 0,
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

      // Checar se ao juntar mesas tem alguma aberta
      const tables_id = table || []

      if(tables_id.length > 1){
        // todos mesas precisam estar livres
        const free_tables = tables_id.filter((_id) => getByIdInList(tables, _id).status === 'free');
        if(free_tables.length !== tables_id.length){
          message.error('Para juntar mesas, todas precisam estar livres');
          return;
        }
      }

      const payload = noEmptyFields({
        tables_id,
        products_id,
        ...rest
      })


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
      const { id, ...rest_current } = current;
      const { transfer_to, ...rest_values } = values;
      const transfer_to_final =  transfer_to ? String(transfer_to) : null;

      const payload = noEmptyFields({
        transfer_to: transfer_to_final,
        is_transaction: transfer_to_final ? true : null, 
        ...objectOnlyWantedKeys(rest_current, [
          'customer_name', 
          'discount_amount',
          'type',
          'status',
        ]),
        ...objectOnlyWantedKeys(rest_values, [
          'customer_name',
          'discount_amount',
        ]),
      })
      const response = await api.put(`/order/${id}`, payload);
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

  const addProductOrder = useCallback(async () => {
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

    if(actionType === 'update'){
      await api.post(`/order/${current.id}/add-product/${__product.id}`, { quantity })
      fetchOrders()
    }

    message.success('Produto adicionado')

    setOrderProducts(newList);
    setProductOrder(null);
    setQuantity(1);

  }, [products, quantity, productOrder, orderProducts, current]);

  const removeProductOrder = useCallback(async (productIndex) => {
    const updated = orderProducts.filter((_, index) => index !== productIndex)

    if(actionType === 'update'){
      await api.post(`/order/${current.id}/remove-product/${orderProducts[productIndex].id}`);
      fetchOrders();
    }

    message.success('Produto removido');

    setOrderProducts(updated)
  }, [orderProducts, current]);

  const calcTotalProduts = (_products = [], discount=0) => {
    const d = discount || 0;
    const result = _products.reduce((acc, curr) => acc + curr.sell_price * curr.quantity, 0);
    return result - d;
  }

  useEffect(() => {
    if (current && actionType === 'update') {
      form.setFieldsValue(current);

      if(current.products) {
        setOrderProducts(current.products.map((_product) => ({
          name: _product.name,
          id: _product.id,
          quantity: _product.order_product.quantity,
          sell_price: _product.sell_price,
        })));
      }
    }else {
      setOrderProducts([]);
    }
    
  }, [open, actionType, current, form]);

  return (
    <Drawer
      title={
        actionType === 'create'
          ? 'Criar comanda'
          : `Atualizar ${current && current.customer_name}`
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
                    <Radio.Button value="single" disabled={actionType === 'update'}>Avulso</Radio.Button>
                    <Radio.Button value="table" disabled={actionType === 'update'}>
                      {actionType === 'update' && current && current.tables[0] ?
                        <Tooltip 
                          title={`mesa atual: ${current.tables[0].name} - ${current.tables[0].status_label}`} color="green">
                          Mesa
                        </Tooltip> : 'Mesa'}
                    </Radio.Button>
                   
                    
                    <Radio.Button value="sand" disabled={actionType === 'update'}>Areia</Radio.Button>
                    <Radio.Button value="other" disabled={actionType === 'update'}>Outro</Radio.Button>
                    </Radio.Group>
                </Form.Item>
              </Col>
              { actionType === 'update' && current ?
                <Col span={12}>
                  <Form.Item
                      name="transfer_to"
                      label="Transferir comanda para"
                      rules={[
                      {
                          required: false,
                          message: 'Escolha uma opção!',
                      },
                      ]}
                  >
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="transferir"
                        defaultValue={[]}
                        >
                        { current.type !== 'single' ? <Option value="single">Avulso</Option> : null }
                        { current.type !== 'sand' ? <Option value="sand">Areia</Option> : null }
                        { current.type !== 'other' ? <Option value="other">Outro</Option> : null }
                        {tableOptions.filter((_table) => {
                          if(current && current.tables[0]){
                            return _table.id !== current.tables[0].id
                          }
                          return true;                          
                        }).map((_t) =>
                            <Option value={_t.id} key={_t.id}>
                              MESA: {_t.name} - STATUS: {_t.status_label} - TIPO: {_t.type_label}
                            </Option>)}
                        </Select>
                  </Form.Item>
                </Col> : null }
            {formValues.type === 'table' && actionType === 'create' ?
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
              { actionType === 'update' && current !== null ? <>
                <Title level={5} style={{margin:0}}>SUB TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(orderProducts))}</span></Title>
                <Title level={4} style={{margin:0}}>TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(orderProducts, formValues.discount_amount))}</span></Title>       
              </> : null}
           </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default SaleDrawer;
