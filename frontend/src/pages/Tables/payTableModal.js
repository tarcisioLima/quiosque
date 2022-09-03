import { Table, Typography, Modal, Form, Radio, Row, Col, message, Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { useSale } from '~/context/sale';
import formatCash from '~/utils/formatCash';
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
    current,
    fetchTables,
    form,
    } = useSale();
    
  
  const onFinish = async (values) => {
    const response = await api.put(`/order/${current.id}`, { 
        ...values, status: 'paid', customer_name: current.customer_name,
        type: current.type,
    })

    if (response) {
        message.success(`Comanda finalizada com sucesso!`);
        setOpenPayOrderModal(false);
        setCurrent(null);
        fetchOrders();
        fetchTables();
      }
  }

  const handleOk = () => {
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

  const calcTotalOrders = (_orders = []) => {
    const result = _orders.reduce((acc, _order) => {
      const totalProducts = _order.products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
      return acc + (totalProducts - _order.discount_amount || 0)
    }, 0);
    return formatCash(result);
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
            initialValues={{ payment_type: ''}}
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
                {/* <Col span={4}>
                    <div className="print-btn-order">
                        <Button color='primary' onClick={() => window.print()}><PrinterOutlined/></Button>
                    </div>
                </Col> */}
             </Row>
        </Form>

        {
            current !== null ? (<>
              <Title level={5}>COMANDAS</Title>
                <Tabs defaultActiveKey="0" onChange={onChangePanel}>
                  {current.orders.map((_order, index) => 
                  <TabPane tab={_order.customer_name} key={index}>
                     <Title level={5}>PRODUTOS</Title>
                      <Table columns={columnsProduct} dataSource={_order.products} pagination={false}/>
                      <br/>
                      <Text type="secondary" style={{fontSize: 12}}>
                        TOTAL INDIVIDUAL = &nbsp;
                      <span style={{margin:0}}>DESCONTO: <span className="orderAmount">{formatCash(0)}</span></span> &nbsp;
                      <span style={{margin:0}}>SUB TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(_order.products))}</span></span> &nbsp;
                      <span style={{margin:0}}>TOTAL: <span className="orderAmount">{formatCash(calcTotalProduts(_order.products, _order.discount_amount))}</span></span>
                      </Text>
                  </TabPane>)}
                </Tabs>

                <br/>
                TOTAL DA MESA = &nbsp;
                <Title level={5} style={{margin:0}}>DESCONTO: <span className="orderAmount">{formatCash(current.discount_amount || 0)}</span></Title>
                <Title level={5} style={{margin:0}}>SUB TOTAL: <span className="orderAmount">{formatCash(calcTotalOrders(current.orders))}</span></Title>
                <Title level={4} style={{margin:0}}>TOTAL: <span className="orderAmount">{formatCash(calcTotalOrders(current.orders, current.discount_amount))}</span></Title>

            </>) : null
        }
       
        
      </Modal>
    </>
  );
};

export default PayTableModal;