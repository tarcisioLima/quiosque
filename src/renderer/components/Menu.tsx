import {
  UsergroupAddOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Início', '1', <DesktopOutlined />),
  getItem('Mesas', '2', <UsergroupAddOutlined />),
  getItem('Relatórios', '3', <PieChartOutlined />),
];

const Initial: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{ height: '100%' }}
        items={items}
      />
    </div>
  );
};

export default Initial;
