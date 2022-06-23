import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout, Typography } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Menu from './components/Menu';

import Initial from './Initial';
import Tables from './Tables';

const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <Layout className="mainLayout">
        <Sider trigger={null} width={256} collapsible collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content className="layout-content">
            <Router>
              <Routes>
                <Route path="/" element={<Initial />} />
                <Route path="/mesas" element={<Tables />} />
              </Routes>
            </Router>
          </Content>
          <Footer>
            <Text code>By: Tarcísio Lima - 2022</Text>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
