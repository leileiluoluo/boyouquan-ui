import React from 'react';
import { Form, Input, Button, Card, Typography, Space, Row, Col, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginForm({ formData, error, handleChange, handleSubmit }) {
    return (
        <>
            <Title level={3} style={{ fontWeight: 'bold' }}>
                管理员登录
            </Title>
            <Card style={{ marginTop: '16px' }}>
                <Form layout="vertical">
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                            <Space align="center" size="small">
                                <Text>账号 *</Text>
                                {error.code === 'login_username_invalid' || error.code === 'login_username_password_invalid' ? (
                                    <Text type="danger">{error.message}</Text>
                                ) : null}
                            </Space>
                            <Input 
                                style={{ marginTop: '8px', fontSize: '14px' }}
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                prefix={<UserOutlined />}
                                placeholder="请输入账号"
                            />
                        </div>

                        <div>
                            <Space align="center" size="small">
                                <Text>密码 *</Text>
                                {error.code === 'login_password_invalid' ? (
                                    <Text type="danger">{error.message}</Text>
                                ) : null}
                            </Space>
                            <Input.Password 
                                style={{ marginTop: '8px', fontSize: '14px' }}
                                type="password"
                                name="password"
                                placeholder="密码"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                prefix={<LockOutlined />}
                            />
                        </div>

                        <div style={{ marginTop: '8px' }}>
                            <Button type="primary" onClick={handleSubmit}>
                                登录
                            </Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </>
    )
}