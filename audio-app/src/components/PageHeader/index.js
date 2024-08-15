import { Button, Col, Flex, Layout, Menu, Row } from 'antd';
import PropsTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../reducers/actions';

const { Header } = Layout;

const items = [{
    key: 'audio_management',
    label: `Audio Management`,
}, {
    key: 'user_management',
    label: `User management`,
}];

function PageHeader({ logout, username, onClickHeaderMenu }) {
    const isLoggedIn = username.length > 0;

    const handleLogout = () => {
        onClickHeaderMenu('audio_management');
        logout();
    };

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Row style={{ width: '100%' }}>
                <Col span={2}>
                    <Flex justify="center">
                        <div style={{ color: 'white', padding: '0px 16px' }}>
                            Audio App
                        </div>
                    </Flex>
                </Col>
                <Col span={10}>
                    {isLoggedIn ? <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['audio_management']}
                        items={items}
                        style={{ flex: 1, minWidth: 0 }}
                        onClick={(e) => {
                            onClickHeaderMenu(e.key);
                        }}
                    /> : null}

                </Col>
                <Col span={10}>
                </Col>
                <Col span={2}>
                    {isLoggedIn ? <Button type="link" onClick={handleLogout}>
                        Logout
                    </Button> : null}
                </Col>
            </Row>
        </Header>
    );
}

PageHeader.propTypes = {
    logout: PropsTypes.func.isRequired,
    username: PropsTypes.string.isRequired,
    onClickHeaderMenu: PropsTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    username: state.auth.user.username
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);