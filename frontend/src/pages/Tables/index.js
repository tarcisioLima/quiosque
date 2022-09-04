import React, { useCallback } from 'react';
import { Card, Divider, PageHeader, Button, Typography, Col, Row, Tag, message } from 'antd';
import { SettingOutlined, DeleteOutlined, FileDoneOutlined  } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import Drawer from './drawer';
import SaleProvider, { useSale } from '~/context/sale';
import api from '~/services/api';
import formatCash from '~/utils/formatCash';
import PayTableModal from './payTableModal';


const { Text } = Typography;

const Tables = () => {
  const {
    tables,
    openNewOrder,
    openUpdateTable,
    fetchTables,
    triggerOpenPayModal,
    onlyNotPayedOrders,
  } = useSale();


  const removeTable = useCallback(async (table) => {
    if(table.status !== 'free') {
      message.error('A mesa precisa estar livre para ser excluida!');
      return;
    }
    Swal.fire({
      title: `Mesa ${table.name}`,
      text: 'Deseja realmente excluir esta mesa?',
      confirmButtonText: 'Excluir mesa',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await api.delete(`/table/${table.id}`);
            message.success('Mesa excluida com sucesso!! :D');
            fetchTables();
          
        } catch (err) {
          console.log('ERR: ', err);
        }
      }
    });
  }, [api, fetchTables]);


  const calcTotalOrders = (_orders = []) => {
    const result = _orders.reduce((acc, _order) => {
      const totalProducts = _order.products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
      return acc + (totalProducts - _order.discount_amount || 0)
    }, 0);
    return formatCash(result);
  }

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
      <PayTableModal/>

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
            <Col span={6} style={{
              marginBottom: 15,
              
              }}>
              <Card
                title={`${_table.name} - ${_table.type_label}`}
                style={{
                  width: '100%',
                  marginBottom: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                actions={[
                  <SettingOutlined key="setting" title="Editar" onClick={() => openUpdateTable(_table)}/>,
                  <DeleteOutlined key="delete" title='Excluir' onClick={() => removeTable(_table)}/>,
                  <FileDoneOutlined 
                    key="detail" 
                    title="Pagar" 
                    onClick={() => triggerOpenPayModal(_table)} 
                  />
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
                    { _table.status === 'opened' ? <div>
                      <Text code>Total de comandas: {onlyNotPayedOrders(_table.orders).length}</Text><br/>
                      <Text code type="success">Lucro total da mesa: {calcTotalOrders(onlyNotPayedOrders(_table.orders))}</Text>
                    </div> : null }
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
