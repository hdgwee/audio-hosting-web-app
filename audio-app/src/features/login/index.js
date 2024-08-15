import { Button, Flex, Form, Input } from 'antd';
import PropsTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../reducers/actions';

function Login({ login }) {
    return (
        <Flex justify="center">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={(values) => {
                    if (values.username && values.password) {
                        login(values.username, values.password);
                    }
                }}
            >
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
}

Login.propTypes = {
    login: PropsTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        const credential = {
            username,
            password,
        };

        dispatch(login(credential));
    },
});

export default connect(null, mapDispatchToProps)(Login);