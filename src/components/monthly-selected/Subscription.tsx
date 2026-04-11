import React from 'react';
import { Flex, Input, Button, Form } from 'antd';
import GlobalDialog from '../common/dialog/GlobalDialog';
import { isEmailValid } from '../../utils/EmailUtil';
import { useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';

export default function Subscription() {
    const [form] = Form.useForm();
    const [error, setError] = useState({ code: '', message: '' });
    const [dialogOpen, setDialogOpen] = useState(false);

    const submitSubscription = async (email) => {
        const resp = await RequestUtil.post('/api/subscriptions',
            JSON.stringify({ 'email': email, 'type': 'MONTHLY_SELECTED' }),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            setError({ code: '', message: '' });
        }

        setDialogOpen(true);
    }

    const handleSubmit = async (values) => {
        const email = values.email;
        
        // 额外的自定义验证
        if (!isEmailValid(email.trim())) {
            setError({ code: 'subscription_params_invalid', message: '邮箱格式不正确，请返回修改！' });
            setDialogOpen(true);
            return;
        }

        await submitSubscription(email.trim());
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        if ('' === error.code) {
            // 订阅成功后清空表单
            form.resetFields();
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            style={{ width: '100%' }}
        >
            <Flex gap={8} align="center" justify="space-between" style={{ width: '100%' }}>
                <Form.Item
                    name="email"
                    style={{ flex: 1, marginBottom: 0 }}
                    rules={[
                        { required: true, message: '请输入邮箱地址' },
                        { type: 'email', message: '邮箱格式不正确' }
                    ]}
                >
                    <Input 
                        placeholder="输入邮箱并订阅，次月首日将自动收到上月精选文章" 
                    />
                </Form.Item>

                <GlobalDialog
                    title={'' != error.code ? '错误提示' : '提示'}
                    titleColor={'' != error.code ? 'crimson' : ''}
                    message={'' != error.code ? error.message : `您的邮箱 ${form.getFieldValue('email')} 已成功订阅「每月精选」频道，您会在每个月初自动收到上个月的精选文章邮件！刚刚已将上个月的精选文章发到了您的邮箱，请注意查看！`}
                    closeButtonName={'' != error.code ? '返回' : '关闭窗口'}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    onClose={handleDialogClose}
                />

                <Button type="primary" htmlType="submit">
                    订阅
                </Button>
            </Flex>
        </Form>
    );
}