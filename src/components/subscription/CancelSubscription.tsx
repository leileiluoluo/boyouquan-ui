import React, { useEffect, useState } from 'react';
import { Form, Card, Typography, Space, Input, Button, Checkbox, message } from 'antd';
import { getURLParameter } from '../../utils/CommonUtil';
import GlobalDialog from '../common/dialog/GlobalDialog';
import RequestUtil from '../../utils/APIRequestUtil';

const { Title, Text } = Typography;

export default function CancelSubscription() {
    const email = getURLParameter('email') || '';
    const token = getURLParameter('token') || '';

    const [idOptions, setIdOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
    const [error, setError] = useState<{ code: string; message: string }>({ code: '', message: '' });
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchData = async (email: string) => {
        const resp = await RequestUtil.get(`/api/subscriptions/${email}`);
        const respBody = await resp.json();

        if (resp.status !== 200) {
            setError(respBody);
            setDialogOpen(true);
        } else {
            if (respBody.length <= 0) {
                setError({ code: 'no_subscriptions', message: '您未订阅任何频道，无需取消' });
                setDialogOpen(true);
                return;
            }

            const optionList = respBody.map((item: any) => ({
                id: item.type,
                label: item.name
            }));
            setOptions(optionList);
            setIdOptions(optionList.map(item => item.id)); // 默认全选
            setError({ code: '', message: '' });
        }
    };

    const submit = async (email: string, token: string, types: string[]) => {
        const formData = {
            email: email,
            token: token,
            types: types
        };

        const resp = await RequestUtil.delete('/api/subscriptions', JSON.stringify(formData), {
            'Content-Type': 'application/json',
        });

        if (resp.status !== 204) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            setError({ code: '', message: '' });
        }
        setDialogOpen(true);
    };

    const handleChange = (value: string[]) => {
        setIdOptions(value);
    };

    const handleSubmit = () => {
        if (idOptions.length <= 0) {
            setError({ code: 'type_not_selected', message: '您未选择任何需要取消的频道' });
            setDialogOpen(true);
            return;
        }
        submit(email, token, idOptions);
    };

    useEffect(() => {
        if (email === '') {
            setError({ code: 'email_not_provided', message: '未提供邮箱，无法取消订阅' });
            setDialogOpen(true);
            return;
        }

        if (token === '') {
            setError({ code: 'token_not_provided', message: '未提供令牌，无法取消订阅' });
            setDialogOpen(true);
            return;
        }

        fetchData(email);
    }, [email, token]);

    return (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div>
                <Title level={3} style={{ fontWeight: 'bold', margin: 0 }}>取消订阅</Title>
            </div>

            <div style={{ minHeight: '300px' }}>
                <Card>
                    <Form layout="vertical">
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            {/* 提示弹窗 */}
                            <GlobalDialog
                                title={error.code ? '错误提示' : '提示'}
                                titleColor={error.code ? 'red' : undefined}
                                message={error.code ? error.message : `取消成功！您的邮箱 ${email} 将不再收到对应频道的任何邮件！`}
                                closeButtonName={error.code ? '返回' : '关闭窗口'}
                                dialogOpen={dialogOpen}
                                setDialogOpen={setDialogOpen}
                            />

                            {/* 邮箱展示 */}
                            <div>
                                <Text type="secondary">您的邮箱：</Text>
                                <Input
                                    value={email}
                                    readOnly
                                    style={{ marginTop: 8 }}
                                />
                            </div>

                            {/* 订阅频道选择 */}
                            <div>
                                <Text type="secondary">您订阅的所有频道：</Text>
                                <Card
                                    size="small"
                                    style={{ marginTop: 8 }}
                                >
                                    <Checkbox.Group
                                        options={options}
                                        value={idOptions}
                                        onChange={handleChange}
                                        style={{ width: '100%' }}
                                    />
                                </Card>
                            </div>

                            <Text type="secondary" style={{ marginTop: 8 }}>
                                请勾选需要取消的频道，然后点击提交！
                            </Text>

                            {/* 提交按钮 */}
                            <div style={{ marginTop: 8 }}>
                                <Button type="primary" onClick={handleSubmit}>
                                    取消订阅
                                </Button>
                            </div>
                        </Space>
                    </Form>
                </Card>
            </div>
        </Space>
    );
}