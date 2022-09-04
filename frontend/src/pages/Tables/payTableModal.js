import { Table, Typography, Modal, Form, Radio, Row, Col, message, Button, Tabs, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useSale } from '~/context/sale';
import formatCash from '~/utils/formatCash';
import { formatNumber, parserNumber } from '~/utils/currencyMask';
import { columnsProduct } from './reusables';
import api from '~/services/api';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const PayTableModal = () => {
const {    
    openPayOrderModal, 
    setCurrent,
    setOpenPayOrderModal,
    fetchOrders,
    onlyNotPayedOrders,
    current,
    fetchTables,
    form,
    } = useSale();

    const [formValues, setFormValues] = useState({});
    
  
  const onFinish = async (values) => {
    const response = await api.post(`/order/close-table/${current.id}`, { 
        ...values,
    })

    if (response) {
        message.success(`Mesa finalizada com sucesso!`);
        setOpenPayOrderModal(false);
        setCurrent(null);
        fetchOrders();
        fetchTables();
      }
  }

  const handleOk = () => {
    if(onlyNotPayedOrders(current && current.orders).length === 0){
      message.error('Não há comandas para finalização');
      return;
    }
    form.submit()
  };

  const handleCancel = () => {
    setOpenPayOrderModal(false);
    setCurrent(null);
  };

  const calcTotalProduts = (_products = [], discount=0) => {
    const d = discount || 0;
    const result = _products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
    return result - d;
  }

  const calcTotalOrders = (_orders = [], discount=0) => {
    const result = _orders.reduce((acc, _order) => {
      const totalProducts = _order.products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
      return acc + (totalProducts - _order.discount_amount || 0)
    }, 0);
    return formatCash(result-discount);
  }

  const onChangePanel = (key) => {
    console.log(key);
  };

  return (
    <>
      <Modal 
        title={`Finalizar Mesa ${current ? '#'+ current.id + ' | ' + current.name: ''}`} 
        visible={openPayOrderModal} 
        width={700}
        onOk={handleOk}
        okText="Finalizar mesa"
        onCancel={handleCancel}
        >
       
        <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            onFinish={onFinish}
            initialValues={{ payment_type: '', discount_amount: 0}}
            onValuesChange={(_, values) => setFormValues(values)}
        >
             <Row gutter={16}>
                <Col span={20}>
                    <Form.Item
                        name="payment_type"
                        label="Escolha uma Forma de Pagamento"
                        rules={[
                        {
                            required: true,
                            message: 'Escolha uma opção!',
                        },
                        ]}
                    >
                        <Radio.Group>
                        <Radio.Button value="cash">Dinheiro</Radio.Button>
                        <Radio.Button value="credit">Crédito</Radio.Button>
                        <Radio.Button value="debit">Débito</Radio.Button>
                        <Radio.Button value="pix">Pix</Radio.Button>
                        <Radio.Button value="transfer">Transferência</Radio.Button>
                        <Radio.Button value="check">Cheque</Radio.Button>
                        <Radio.Button value="other">Outro</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
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
                        
             </Row>
        </Form>

        {
            current !== null ? (<>
              <Title level={5}>COMANDAS</Title>
                <Tabs defaultActiveKey="0" onChange={onChangePanel}>
                  {onlyNotPayedOrders(current.orders).map((_order, index) => 
                  <TabPane tab={_order.customer_name} key={index}>
                     <Title level={5}>PRODUTOS</Title>
                      <Table columns={columnsProduct} dataSource={_order.products} pagination={false} />
                      <br/>
                      <Text type="secondary" style={{fontSize: 12}}>
                        TOTAL INDIVIDUAL = &nbsp;
                      <span style={{margin:0}}>DESCONTO: <span className="orderAmount">{formatCash(_order.discount_amount || 0)}</span></span> &nbsp;
                      <span style={{margin:0}}>SUB TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(_order.products))}</span></span> &nbsp;
                      <span style={{margin:0}}>TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(_order.products, _order.discount_amount))}</span></span>
                      </Text>
                  </TabPane>)}
                </Tabs>

                <br/>
                TOTAL DA MESA = &nbsp;
                <Title level={5} style={{margin:0}}>DESCONTO: <span className="orderAmount">
                  {formatCash(formValues.discount_amount || 0)}</span></Title>
                <Title level={5} style={{margin:0}}>SUB TOTAL: <span className="orderAmount">
                  {formatCash(calcTotalOrders(onlyNotPayedOrders(current.orders)))}</span></Title>
                <Title level={4} style={{margin:0}}>TOTAL: <span className="orderAmount">
                  {formatCash(calcTotalOrders(onlyNotPayedOrders(current.orders), formValues.discount_amount || 0))}</span></Title>

            </>) : null
        }
       
        
      </Modal>
    </>
  );
};

export default PayTableModal;