import { Button, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);

    const fetchData = () => {
        fetch("http://localhost:9000/user", {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((data) => {
            const users = data.map((user) => {
                return {
                    key: user.id,
                    username: user.username,
                };
            });

            setUsers(users);
        }).catch(() => {
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [deleteForm] = Form.useForm();

    // ********** Create user **********
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreate = (values) => {
        const payload = {
            username: values.username, password: values.password
        };

        fetch("http://localhost:9000/user", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.status === 200) {
                setIsCreateModalOpen(false);
                createForm.resetFields();
                fetchData();
            }
        }).catch(() => {
        });
    };

    const handleCancelCreate = () => {
        setIsCreateModalOpen(false);
    };

    // ********** Update user **********
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const showUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const handleUpdate = (values) => {
        const payload = {
            username: values.username, password: values.password
        };

        fetch("http://localhost:9000/user", {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.status === 200) {
                setIsUpdateModalOpen(false);
            }
        }).catch(() => {
        });
    };

    const handleCancelUpdate = () => {
        setIsUpdateModalOpen(false);
    };

    // ********** Delete user **********
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (values) => {
        const payload = {
            username: values.username
        };

        fetch("http://localhost:9000/user", {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE",
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.status === 200) {
                setIsDeleteModalOpen(false);
                fetchData();
            }
        }).catch(() => {
        });
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => (
                <Space size="large">
                    <Button type='link' onClick={() => {
                        updateForm.setFieldsValue({ username: item.username });
                        showUpdateModal();
                    }}>Update</Button>
                    <Button type='link' onClick={() => {
                        deleteForm.setFieldsValue({ username: item.username });
                        showDeleteModal();
                    }
                    }>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={users} pagination={false} />
                    <Button block style={{ marginTop: 32 }} onClick={showCreateModal}>Add User</Button>
                </Col>
            </Row>

            <Modal title="Add User" open={isCreateModalOpen} onOk={createForm.submit} onCancel={handleCancelCreate} okText='Add'>
                <Form form={createForm} onFinish={handleCreate} style={{ paddingTop: 8 }}>
                    <Form.Item name="username">
                        <Input placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password">
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Update User" open={isUpdateModalOpen} onOk={updateForm.submit} onCancel={handleCancelUpdate} okText='Update'>
                <Form form={updateForm} onFinish={handleUpdate} style={{ paddingTop: 8 }}>
                    <Form.Item name="username">
                        <Input placeholder="Username" disabled />
                    </Form.Item>

                    <Form.Item name="password">
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Delete User" open={isDeleteModalOpen} onOk={deleteForm.submit} onCancel={handleCancelDelete} okType='danger' okText='Delete'>
                <Form form={deleteForm} onFinish={handleDelete} style={{ paddingTop: 8 }}>
                    <Form.Item name="username">
                        <Input placeholder="Username" disabled />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
}

export default UserManagement;