import { Col, Layout, Row, theme } from 'antd';
import React, { useState } from 'react';
import AudioManagement from './components/AudioManagement';
import Login from './features/login';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import PropsTypes from 'prop-types';
import UserManagement from './components/UserManagement';
import { connect } from 'react-redux';

const { Content } = Layout;

const App = ({ username }) => {
  const [selectedKey, setSelectedKey] = useState('audio_management');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClickHeaderMenu = (selectedKey) => {
    setSelectedKey(selectedKey);
  };

  const isLoggedIn = username.length > 0;

  return (
    <Layout>
      <PageHeader onClickHeaderMenu={onClickHeaderMenu} />

      <Content style={{ padding: '48px' }}>
        <Row
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Col span={24}>
            {isLoggedIn ? null : <Login />}
            {console.log(isLoggedIn, selectedKey)}
            {isLoggedIn && selectedKey === 'audio_management' ? <AudioManagement /> : null}
            {isLoggedIn && selectedKey === 'user_management' ? <UserManagement /> : null}
          </Col>
        </Row>
      </Content>
      <PageFooter />
    </Layout>
  );
};

App.propTypes = {
  username: PropsTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps, null)(App);