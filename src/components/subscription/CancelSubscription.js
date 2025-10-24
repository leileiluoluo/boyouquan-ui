import { Form } from '@radix-ui/react-form';
import { Box, Button, Card, Flex, Heading, TextField, Text } from '@radix-ui/themes';
import { getURLParameter } from '../../utils/CommonUtil';
import GlobalDialog from '../common/dialog/GlobalDialog';
import RequestUtil from '../../utils/APIRequestUtil';
import { useEffect, useState } from 'react';
import GlobalCheckbox from '../common/checkbox/GlobalCheckbox';

export default function CancelSubscription() {
    const email = getURLParameter('email') || '';
    const token = getURLParameter('token') || '';

    const [idOptions, setIdOptions] = useState([]);
    const [options, setOptions] = useState([]);
    const [error, setError] = useState({ code: '', message: '' });
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchData = async (email) => {
        const resp = await RequestUtil.get(`/api/subscriptions/${email}`);

        const respBody = await resp.json();
        if (resp.status != 200) {
            setError(respBody);
            setDialogOpen(true);
        } else {
            if (respBody.length <= 0) {
                setError({ code: 'no_subscriptions', message: '您未订阅任何频道，无需取消' });
                setDialogOpen(true);
                return;
            }

            const optionList = respBody.map(item => ({
                id: item.type,
                label: item.name
            }));
            setOptions(optionList);

            setError({ code: '', message: '' });
        }
    };

    const submit = async (email, token, types) => {
        const formData = {
            'email': email,
            'token': token,
            'types': types
        }

        const resp = await RequestUtil.delete('/api/subscriptions', JSON.stringify(formData), {
            'Content-Type': 'application/json',
        });

        if (resp.status != 204) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            setError({ code: '', message: '' });
        }
        setDialogOpen(true);
    };

    const handleChange = (value) => {
        setIdOptions(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (idOptions.length <= 0) {
            setError({ code: 'type_not_selected', message: '您未选择任何需要取消的频道' });
            setDialogOpen(true);
            return;
        }

        submit(email, token, idOptions);
    };

    useEffect(() => {
        if ('' === email) {
            setError({ code: 'email_not_provided', message: '未提供邮箱，无法取消订阅' });
            setDialogOpen(true);
            return;
        }

        if ('' === token) {
            setError({ code: 'token_not_provided', message: '未提供令牌，无法取消订阅' });
            setDialogOpen(true);
            return;
        }

        fetchData(email);
    }, [email]);

    return (
        <Flex direction="column" gap="2">
            <Box>
                <Heading size="3" weight="bold">取消订阅</Heading>
            </Box>
            <Box minHeight="300px">
                <Card>
                    <Form>
                        <Flex gap="2" direction="column">
                            <GlobalDialog
                                title={'' != error.code ? '错误提示' : '提示'}
                                titleColor={'' != error.code ? 'crimson' : ''}
                                message={'' != error.code ? error.message : `取消成功！您的邮箱 ${email} 将不再收到对应频道的任何邮件！`}
                                closeButtonName={'' != error.code ? '返回' : '关闭窗口'}
                                dialogOpen={dialogOpen}
                                setDialogOpen={setDialogOpen}
                            />

                            <Box>
                                <Text size="2">您的邮箱：</Text>
                                <TextField.Root mt="2" value={email} readOnly />
                            </Box>

                            <Box>
                                <Text size="2">您订阅的所有频道：</Text>
                                <Card mt="2">
                                    <GlobalCheckbox
                                        options={options}
                                        defaultIdOptions={options.map(item => item.id)}
                                        handleChange={handleChange} />
                                </Card>
                            </Box>

                            <Text mt="2" size="2">请勾选需要取消的频道，然后点击提交！</Text>

                            <Box mt="2">
                                <Button onClick={handleSubmit}>取消订阅</Button>
                            </Box>
                        </Flex>
                    </Form>
                </Card>
            </Box>
        </Flex>
    )
}