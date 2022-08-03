import React, { useState, useEffect, useCallback } from 'react';
import { Table, Divider, PageHeader, Button, Input } from 'antd';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  FolderOpenOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import api from '~/services/api';
import Swal from 'sweetalert2';
import { columns } from './reusables';
import formatCash from '~/utils/formatCash';
import { toast } from 'react-toastify';
import { Typography } from 'antd';

const { Title } = Typography;

const Cashier = () => {
  const [loading, setLoading] = useState(false);
  const [seeTotal, setSeeTotal] = useState(false);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCashierHistory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('/cashier');
      const { data } = response;
      setTotal(data.cashier.amount);
      setHistory(data.history);
    } catch (err) {
      toast.error('Erro ao obter histórico');
    }
    setLoading(false);
  }, [api]);

  const openCashier = useCallback(async () => {
    try {
      await api.post('/cashier', { type: 'open' });
      toast.success('Caixa aberto!!! :D');
      fetchCashierHistory();
    } catch (err) {
      console.log('ERR: ', err);
      toast.error('Erro ao atualizar :(');
    }
  }, [api, fetchCashierHistory]);

  const closeCashier = useCallback(async () => {
    try {
      await api.post('/cashier', { type: 'close' });
      toast.success('Caixa aberto!!! :D');
      fetchCashierHistory();
    } catch (err) {
      console.log('ERR: ', err);
      toast.error('Erro ao atualizar :(');
    }
  }, [api, fetchCashierHistory]);

  const addCash = useCallback(async () => {
    Swal.fire({
      title: 'Caixa',
      text: 'Digite a quantia a ser creditada',
      input: 'text',

      inputAttributes: {
        id: 'amount',
        autocapitalize: 'off',
        maxLength: 14,
      },
      confirmButtonText: 'Creditar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      const { value } = result;

      if (result.isConfirmed) {
        try {
          if (value) {
            let amount = parseFloat(value.replace(',', '.'));
            await api.post('/cashier', { type: 'in', amount });
            toast.success('Quantida creditada com sucesso!! :D');
            fetchCashierHistory();
          }
        } catch (err) {
          console.log('ERR: ', err);
          toast.error('Erro ao atualizar, talvez formato inválido :(');
        }
      }
    });
  }, [api, fetchCashierHistory]);

  const removeCash = useCallback(async () => {
    Swal.fire({
      title: 'Caixa',
      text: 'Digite a quantia a ser retirada',
      input: 'text',

      inputAttributes: {
        id: 'amount',
        autocapitalize: 'off',
        maxLength: 14,
      },
      confirmButtonText: 'Retirar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      const { value } = result;

      if (result.isConfirmed) {
        try {
          if (value) {
            let amount = parseFloat(value.replace(',', '.'));
            await api.post('/cashier', { type: 'out', amount });
            toast.success('Quantida retirada com sucesso!! :D');
            fetchCashierHistory();
          }
        } catch (err) {
          console.log('ERR: ', err);
          toast.error('Erro ao atualizar, talvez formato inválido :(');
        }
      }
    });
  }, [api, fetchCashierHistory]);

  useEffect(() => {
    fetchCashierHistory();
  }, []);

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Caixa"
        subTitle="Adicionar, Retirar, Abrir, Fechar e Histórico"
        extra={[
          <Button
            key="6"
            type="secondary"
            onClick={() => setSeeTotal(!seeTotal)}
          >
            <MoneyCollectOutlined />{' '}
            {seeTotal ? 'Esconder' : 'Visualizar Total'}
          </Button>,
          <Button key="1" type="default" onClick={() => openCashier()}>
            <FolderOpenOutlined /> Abrir Caixa
          </Button>,
          <Button key="2" type="default" onClick={() => closeCashier()}>
            <CloseCircleOutlined /> Fechar Caixa
          </Button>,
          <Button key="3" type="primary" onClick={() => addCash()}>
            <PlusCircleOutlined /> Adicionar Dinheiro
          </Button>,
          <Button key="4" type="danger" onClick={() => removeCash()}>
            <MinusCircleOutlined /> Retirar Dinheiro
          </Button>,
        ]}
      ></PageHeader>

      {seeTotal ? (
        <>
          <Divider>
            <Title level={3} type="success">
              {formatCash(total)}
            </Title>
          </Divider>
        </>
      ) : null}

      <Table
        filterSearch
        columns={columns()}
        loading={loading}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={history}
      />
    </div>
  );
};

export default Cashier;
