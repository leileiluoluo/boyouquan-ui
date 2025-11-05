import React from 'react';
import { useState, useEffect } from 'react';
import { Form } from '@radix-ui/react-form';
import { Card, Box, Button, Flex, Text, TextField } from '@radix-ui/themes';

import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS, ADMIN_RECOMMENDED_POSTS_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/APIRequestUtil';

export default function AdminRecommendedPostAdd(): React.JSX.Element {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState<string>('');

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

        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const resp = await RequestUtil.post('/api/admin/recommended-posts', JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        if (typeof resp === 'string' || resp.status !== 201) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                const errorObj = respBody as { message?: string };
                setError(errorObj.message || '提交失败');
            } else {
                setError('提交失败');
            }
        } else {
            redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS);
        }
    };

    useEffect(() => {
        permissionCheck();
    }, []);

    return (
        <Card>
            <Form>
                <Flex direction="column" gap="2">
                    <Box>
                        <Flex gap="2" align="center">
                            <Text size="2">文章链接 *</Text>
                            <Text size="2" color="red">{error ? error.message : ''}</Text>
                        </Flex>

                        <TextField.Root mt="2" name="link" id="link" onChange={handleChange} />
                    </Box>

                    <Box mt="2">
                        <Button type="submit" onClick={recommend}>提交</Button>
                    </Box>
                </Flex>
            </Form>
        </Card>
    )
}