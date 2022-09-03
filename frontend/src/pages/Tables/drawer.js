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
  name: '',
  status: '',
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
  } = useSale();

  const onFinish = async (values) => {
    if (actionType === 'create') {
      const response = await api.post('/table', noEmptyFields(values));

      if (response) {
        message.success(`Mesa ${values.name} registrado com sucesso!`);
        closeDrawer();
        fetchTables();
      }
    } else if (actionType === 'update') {
      const { id, ...rest } = current;
      const response = await api.put(`/table/${id}`, noEmptyFields({ ...rest, ...values }));
      if (response) {
        message.success(`Mesa ${values.name} atualizado com sucesso!`);
        closeDrawer();
        fetchTables();
      }
    }
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
          ? 'Criar Mesa'
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
            {actionType === 'create' ? 'Criar Mesa' : 'Atualizar Mesa'}
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
            <Col span={24}>
              <Form.Item
                name="name"
                label="Nome"
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
                  <Radio.Group defaultValue="normal">
                  <Radio.Button value="normal">Normal</Radio.Button>
                  <Radio.Button value="sand">Areia</Radio.Button>
                  <Radio.Button value="other">Outro</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                        required: false,
                        message: 'Escolha uma opção!',
                    },
                    ]}
              >
                  <Radio.Group>
                  <Radio.Button value="free">Livre</Radio.Button>
                  <Radio.Button value="opened">Aberto</Radio.Button>
                  <Radio.Button value="blocked">Bloqueado</Radio.Button>
                  </Radio.Group>
              </Form.Item>
            </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default SaleDrawer;
