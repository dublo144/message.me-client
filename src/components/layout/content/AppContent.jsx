import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AppContent = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: '100%',
        marginTop: 64,
        marginLeft: '15vw'
      }}
    >
      <Content
        className='site-layout-background content'
        style={{
          minHeight: '100%',
          overflow: 'initial',
          margin: 24,
          padding: 24
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AppContent;
