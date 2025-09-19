import { useState, useEffect } from 'react';
import { Form } from '@radix-ui/react-form';
import { Card, Box, Button, Flex, Text, TextField } from '@radix-ui/themes';

import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS, ADMIN_RECOMMENDED_POSTS_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/APIRequestUtil';

export default function AdminRecommendedPostAdd() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const permissionCheck = async () => {
        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId'),
        });

        if (permissionCheckResp.status != 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        }
    };

    const recommend = async (e) => {
        e.preventDefault();

        const resp = await RequestUtil.post('/api/admin/recommended-posts', JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS);
        }
    }

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
                        <Button style={{ fontSize: '12px' }} type="submit" onClick={recommend}>提交</Button>
                    </Box>
                </Flex>
            </Form>
        </Card>
    )
}