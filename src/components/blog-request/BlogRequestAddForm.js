const inputFontSizeStyle = { fontSize: '14px' };
const noticeStyle = { marginTop: '18px', fontSize: '12px' };
const noticeFontStyle = { color: '#cb2e58' };
const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };
import { Card, Box, Button, Flex, Text, TextField, Heading, TextArea } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';

export default function BlogRequestAddForm({ formData, error, handleChange, handleSubmit, isAdminPage }) {
    return (
        <>
            {
                isAdminPage ? '' : <Heading size="4" weight="bold">
                    提交博客
                </Heading>
            }
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="2">
                        <Box>
                            <Flex gap="2" align="center">
                                <Text>博主邮箱 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_admin_email_invalid' || error.code == 'blog_request_email_validation_code_invalid' ? error.message : ''}</Text>
                            </Flex>

                            <Box mt="2">
                                {
                                    isAdminPage ? <TextField.Root style={inputFontSizeStyle} name="adminEmail" placeholder="博主身份凭据，以及用于展示 Gravatar 头像和获取邮件通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} />
                                        : <TextField.Root style={inputFontSizeStyle} name="adminEmail" placeholder="博主身份凭据，以及用于展示 Gravatar 头像和获取邮件通知" id="adminEmail" value={formData.adminEmail} onChange={handleChange} disabled />
                                }
                            </Box>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text>博客名称 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_name_invalid' || error.code == 'blog_submitted_with_same_ip' ? error.message : ''}</Text>
                            </Flex>

                            <Box mt="2">
                                <TextField.Root style={inputFontSizeStyle} name="name" placeholder="您的博客名称" id="name" value={formData.name} onChange={handleChange} />
                            </Box>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text>RSS 地址 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_rss_address_invalid' || error.code == 'blog_request_rss_address_black_list' || error.code == 'blog_request_rss_address_exists' ? error.message : ''}</Text>
                            </Flex>

                            <Box mt="2">
                                <TextField.Root style={inputFontSizeStyle} name="rssAddress" placeholder="用于抓取文章" id="rssAddress" value={formData.rssAddress} onChange={handleChange} />
                            </Box>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text>博客描述 *</Text>
                                <Text size="2" color="red">{error.code == 'blog_request_description_invalid' ? error.message : ''}</Text>
                            </Flex>

                            <Box mt="2">
                                <TextArea style={inputFontSizeStyle} name="description" placeholder="描述一下您的博客，建议 100 字以内" id="description" value={formData.description} onChange={handleChange} />
                            </Box>
                        </Box>

                        <Box mt="2">
                            <Button type="submit">提交</Button>
                        </Box>

                        <Box mt="2">
                            {
                                isAdminPage ? '' : <Text style={noticeStyle}>
                                    <Link href="mailto:contact@boyouquan.com?subject=提交博客时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">提交博客遇到问题？我要联系站长！</Link>
                                </Text>
                            }
                        </Box>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}