import React, { useState, useEffect } from 'react';
import {
  PushpinOutlined,
  HomeOutlined,
  InboxOutlined,
  MoneyCollectOutlined,
  TableOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import history from '~/services/history';
import { withRouter } from 'react-router-dom';

const menuList = [
  {
    key: 'dashboard',
    icon: <HomeOutlined />,
    label: 'Início',
  },
  {
    key: 'produtos',
    icon: <PushpinOutlined />,
    label: 'Produtos',
  },
  {
    key: 'vendas',
    icon: <MoneyCollectOutlined />,
    label: 'Vendas',
  },
  {
    key: 'mesas',
    icon: <TableOutlined />,
    label: 'Mesas',
  },
  {
    key: 'caixa',
    icon: <InboxOutlined />,
    label: 'Caixa',
  },
];

const dict = {
  '/dashboard': 'dashboard',
  '/produtos': 'produtos',
  '/caixa': 'caixa',
  '/vendas': 'vendas',
  '/mesas': 'mesas',
};

const SideMenu = ({ location }) => {
  const [activeKey, setActiveKey] = useState(null);

  /* useEffect(() => {
    const { pathname } = location;
    const newActive = dict[pathname] || null;
    setActiveKey();
  }, [location, activeKey]); */

  return (
    <Menu
      mode="inline"
      activeKey={activeKey}
      style={{
        height: '100%',
        borderRight: 0,
      }}
      items={menuList}
      onClick={(item) => {
        history.push(item.key);
      }}
    />
  );
};

export default withRouter(SideMenu);
