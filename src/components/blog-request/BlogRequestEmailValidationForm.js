import { Form } from '@radix-ui/react-form';
import { Card, Box, Button, Flex, Text, TextField, Heading, Link } from '@radix-ui/themes';

const inputFontSizeStyle = { fontSize: '12px' };
const noticeStyle = { marginTop: '18px', fontSize: '12px' };

export default function BlogRequestEmailValidationForm({ formData, error, adminEmailInputRef, sendCodeInputRef, emailValidationCodeInputRef, emailValidationButtonRef, handleChange, handleValidationButtonClick, handleSubmit, isAdminPage }) {
    return (
        <>
            {
                isAdminPage ? '' : <Heading size="3" weight="bold">
                    验证邮箱
                </Heading>
            }
            <Card>
                <Form>
                    <Flex direction="column" gap="2">
                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">博主邮箱 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_admin_email_invalid' || error.code == 'blog_request_email_validation_code_limit_exceed' ? error.message : ''}</Text>
                            </Flex>

                            <TextField.Root mt="2" style={inputFontSizeStyle} ref={adminEmailInputRef} name="adminEmail" placeholder="博主身份凭据，用于鉴定博客拥有权、展示 Gravatar 头像和获取邮件通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} />
                        </Box>

                        <Box mt="2">
                            <Button style={{ fontSize: '12px' }} type="button" ref={sendCodeInputRef} onClick={handleValidationButtonClick} >发送验证码</Button>
                        </Box>

                        <Box mt="2" ref={emailValidationCodeInputRef} style={{ display: "none" }}>
                            <Flex gap="2" align="center">
                                <Text size="2">验证码 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_email_validation_code_invalid' ? error.message : ''}</Text>
                            </Flex>

                            <TextField.Root mt="2" type="number" style={inputFontSizeStyle} name="emailVerificationCode" placeholder="上述邮箱收到的 6 位验证码" id="emailVerificationCode" value={formData.emailVerificationCode} onChange={handleChange} />
                        </Box>

                        <Box mt="2" ref={emailValidationButtonRef} style={{ display: "none" }}>
                            <Button style={{ fontSize: '12px' }} type="submit" onClick={handleSubmit}>验证</Button>
                        </Box>

                        <Box mt="2">
                            {
                                isAdminPage ? '' : <Text size="2" style={noticeStyle}>
                                    <Link href="mailto:support@boyouquan.com?subject=验证邮箱时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">收不到验证码？我要联系站长！</Link>
                                </Text>
                            }
                        </Box>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}