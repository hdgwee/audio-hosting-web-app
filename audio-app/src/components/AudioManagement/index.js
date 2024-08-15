import { Button, Col, Flex, Form, Input, Modal, Row, Space, Table, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const { Text } = Typography;

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};


function AudioManagement({ username }) {
    const [files, setFiles] = useState([]);

    const fetchData = () => {
        const payload = {
            owner: username
        };
        fetch("http://localhost:9000/file/listing", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((data) => {
            const files = data.map((file) => {
                return {
                    key: file.id,
                    fileName: file.fileName,
                    description: file.description,
                    category: file.category,
                };
            });

            setFiles(files);
        }).catch(() => {
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [createForm] = Form.useForm();
    const [file, setFile] = useState("");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreate = (values) => {
        getBase64(file).then((audioData) => {
            const payload = {
                description: values.description,
                category: values.category,
                owner: username,
                fileName: file.name,
                data: audioData,
            };

            fetch("http://localhost:9000/file", {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(payload),
            }).then((res) => {
                if (res.status === 200) {
                    setIsCreateModalOpen(false);
                    createForm.resetFields();
                    setFile("");
                    fetchData();
                }
            }).catch((e) => {
                console.error(e);
            });
        });
    };

    const handleCancelCreate = () => {
        setIsCreateModalOpen(false);
    };

    const playAudio = (id) => {
        fetch(`http://localhost:9000/file/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((data) => {
            const audioData = data.data;
            const audio = new Audio(audioData);
            audio.load();
            audio.play();
        }).catch((e) => {
            console.error(e);
        });
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'File Name',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => (
                <Space size="large">
                    <Button type='link' onClick={() => playAudio(item.key)}>Play</Button>
                </Space>
            ),
        },
    ];

    const uploadButton = (
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
    );

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={files} pagination={false} />
                    <Button block style={{ marginTop: 32 }} onClick={showCreateModal}>Add Audio</Button>
                </Col>
            </Row>

            <Modal
                title="Add Audio"
                open={isCreateModalOpen}
                onOk={createForm.submit}
                onCancel={handleCancelCreate}
                okText='Add'
                destroyOnClose
            >
                <Form form={createForm} onFinish={handleCreate} style={{ paddingTop: 8 }}>
                    <Flex justify='center' align='center' gap='middle' vertical style={{ paddingBottom: 24 }}>
                        <Upload
                            name={uuidv4()}
                            listType="text"
                            customRequest={({ onSuccess }) =>
                                onSuccess("ok")
                            }
                            showUploadList={false}
                            action={(file) => {
                                setFile(file);
                            }}
                        >
                            {uploadButton}
                        </Upload>

                        {file ? <Text>{file.name}</Text> : null}
                    </Flex>
                    <Form.Item name="description">
                        <Input placeholder="Description" />
                    </Form.Item>
                    <Form.Item name="category">
                        <Input placeholder="Category" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

AudioManagement.propTypes = {
    username: PropsTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    username: state.auth.user.username
});

export default connect(mapStateToProps, null)(AudioManagement);