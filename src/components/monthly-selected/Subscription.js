import { Box, Flex, TextField, Button } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import GlobalDialog from '../common/dialog/GlobalDialog';
import { isEmailValid } from '../../utils/EmailUtil';
import { useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';

export default function Subscription() {
    const [email, setEmail] = useState();
    const [error, setError] = useState({ code: '', message: '' });
    const [dialogOpen, setDialogOpen] = useState(false);

    const emailValidation = (email) => {
        if (undefined === email || null == email || '' === email.trim()) {
            return { code: 'subscription_params_invalid', message: '未输入有效内容，请返回重新输入！' };
        }

        if (!isEmailValid(email.trim())) {
            return { code: 'subscription_params_invalid', message: '邮箱格式不正确，请返回修改！' };
        }

        return null;
    }

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var error = emailValidation(email);
        if (null !== error) {
            setError(error);
            setDialogOpen(true);
            return;
        }

        submitSubscription(email.trim());
    }

    return <>
        <Box>
            <Form>
                <Flex gap="2" align="center" justify="between">
                    <Box width="100%">
                        <TextField.Root name="email" placeholder="输入邮箱并订阅，次月首日将自动收到上月精选文章" id="email" value={email} onChange={handleChange} />
                    </Box>
                    <GlobalDialog
                        title={'' != error.code ? '错误提示' : '提示'}
                        titleColor={'' != error.code ? 'crimson' : ''}
                        message={'' != error.code ? error.message : `您的邮箱 ${email} 已成功订阅「每月精选」频道，您会在每个月初自动收到上个月的精选文章邮件！刚刚已将上个月的精选文章发到了您的邮箱，请注意查看！`}
                        closeButtonName={'' != error.code ? '返回' : '关闭窗口'}
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                    />
                    <Button onClick={handleSubmit}>订阅</Button>
                </Flex>
            </Form>
        </Box>
    </>
}