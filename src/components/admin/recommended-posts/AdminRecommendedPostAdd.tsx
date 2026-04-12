import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Space, Typography, message } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS, ADMIN_RECOMMENDED_POSTS_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/APIRequestUtil';

const { Text } = Typography;

export default function AdminRecommendedPostAdd(): React.JSX.Element {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const permissionCheck = async (): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        }
    };

    const recommend = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        if (!formData.link || formData.link.trim() === '') {
            setError('请填写文章链接');
            return;
        }

        setLoading(true);
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        try {
            const resp = await RequestUtil.post('/api/admin/recommended-posts', JSON.stringify(formData), {
                'Content-Type': 'application/json',
                'username': username,
                'sessionId': sessionId
            });

            if (typeof resp === 'string' || resp.status !== 201) {
                if (typeof resp !== 'string') {
                    const respBody = await resp.json();
                    const errorObj = respBody as { message?: string };
                    const errorMsg = errorObj.message || '提交失败';
                    setError(errorMsg);
                    message.error(errorMsg);
                } else {
                    const errorMsg = '提交失败';
                    setError(errorMsg);
                    message.error(errorMsg);
                }
            } else {
                message.success('推荐成功');
                redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS);
            }
        } catch (error) {
            const errorMsg = '网络错误，请重试';
            setError(errorMsg);
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        permissionCheck();
    }, []);

    return (
        <Card style={{ marginBottom: '16px' }}>
            <Form layout="vertical">
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Space align="center" size="small">
                            <Text strong>文章链接 *</Text>
                            {error && (
                                <Text type="danger">{error}</Text>
                            )}
                        </Space>
                        <div style={{ marginTop: '8px' }}>
                            <Input 
                                name="link"
                                id="link"
                                onChange={handleChange}
                                placeholder="请输入文章链接"
                                prefix={<LinkOutlined />}
                                status={error ? "error" : ""}
                                allowClear
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '8px' }}>
                        <Button 
                            type="primary" 
                            onClick={recommend}
                            loading={loading}
                            htmlType="submit"
                        >
                            提交
                        </Button>
                    </div>
                </Space>
            </Form>
        </Card>
    )
}