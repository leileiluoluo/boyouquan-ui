import { Form } from '@radix-ui/react-form';
import { Card, Box, Button, Flex, Text, TextField, Heading } from '@radix-ui/themes';

const inputFontSizeStyle = { fontSize: '14px' };

export default function LoginForm({ formData, error, handleChange, handleSubmit }) {
    return (
        <>
            <Heading size="4" weight="bold">
                管理员登录
            </Heading>
            <Card>
                <Form>
                    <Flex direction="column" gap="2">
                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">账号 *</Text>
                                <Text size="2" color="red">{error.code == 'login_username_invalid' || error.code == 'login_username_password_invalid' ? error.message : ''}</Text>
                            </Flex>

                            <TextField.Root mt="2" style={inputFontSizeStyle} name="username" id="username" value={formData.username} onChange={handleChange} />
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">密码 *</Text>
                                <Text size="2" color="red">{error.code == 'login_password_invalid' ? error.message : ''}</Text>
                            </Flex>

                            <TextField.Root mt="2" style={inputFontSizeStyle} type="password" name="password" placeholder="密码" id="password" value={formData.password} onChange={handleChange} />
                        </Box>

                        <Box mt="2">
                            <Button style={{ fontSize: '12px' }} type="submit" onClick={handleSubmit}>登录</Button>
                        </Box>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}