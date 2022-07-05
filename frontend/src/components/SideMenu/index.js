import React from 'react';
import { PushpinOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import history from '~/services/history';

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

const SideMenu = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
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

export default SideMenu;
