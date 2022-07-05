import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import HeaderMenu from '~/components/Header';
import SideMenu from '~/components/SideMenu';
import { Wrapper } from './styles';
import PropTypes from 'prop-types';
const { Content, Sider } = Layout;

const DefaultLayout = ({ children }) => (
  <Layout>
    <Wrapper>
      <div className="header">
        <HeaderMenu />
      </div>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <SideMenu />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: '24px 0px 0px 0px',
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  </Layout>
);

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
