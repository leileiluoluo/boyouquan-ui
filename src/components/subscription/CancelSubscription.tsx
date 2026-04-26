import { useEffect, useState } from 'react';
import { Form, Card, Typography, Space, Input, Button, Checkbox } from 'antd';
import { getURLParameter } from '../../utils/CommonUtil';
import GlobalDialog from '../common/dialog/GlobalDialog';
import RequestUtil from '../../utils/APIRequestUtil';

const { Title, Text } = Typography;

export default function CancelSubscription() {
    const email = getURLParameter('email') || '';
    const token = getURLParameter('token') || '';

    const [idOptions, setIdOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
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

            // ========== 核心修复 ==========
            const optionList = respBody.map((item: any) => ({
                value: String(item.type ?? ''),
                label: item.name ?? '未知频道'
            }));
            setOptions(optionList);
            setIdOptions(optionList.map(item => item.value));
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
        <>
            <Title level={4} style={{ margin: 0 }}>取消订阅</Title>

            <Card style={{ marginTop: 16 }}>
                <Form layout="vertical">
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <GlobalDialog
                            title={error.code ? '错误提示' : '提示'}
                            titleColor={error.code ? 'red' : undefined}
                            message={error.code ? error.message : `取消成功！您的邮箱 ${email} 将不再收到对应频道的任何邮件！`}
                            closeButtonName={error.code ? '返回' : '关闭窗口'}
                            dialogOpen={dialogOpen}
                            setDialogOpen={setDialogOpen}
                        />

                        <div>
                            <Text type="secondary">您的邮箱：</Text>
                            <Input
                                value={email}
                                readOnly
                                style={{ marginTop: 8 }}
                            />
                        </div>

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

                        <div style={{ marginTop: 8 }}>
                            <Button type="primary" onClick={handleSubmit}>
                                取消订阅
                            </Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </>
    );
}