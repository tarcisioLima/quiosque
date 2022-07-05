import React, { useState, useEffect } from 'react';
import { PushpinOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
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
];

const dict = {
  '/dashboard': 'dashboard',
  '/produtos': 'produtos',
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
