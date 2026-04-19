import React from 'react';
import { Card, Flex, Typography, Input, Button, Form, Radio, Space } from 'antd';
import { FormError } from '../../types';

const { Text, Title, Link } = Typography;
const { TextArea } = Input;

const noticeStyle: React.CSSProperties = { marginTop: '18px', fontSize: '12px' };

interface BlogRequestAddFormProps {
    formData: Record<string, string>;
    error: FormError;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (values: Record<string, string>) => void;
    isAdminPage?: string | boolean;
}

export default function BlogRequestAddForm({ formData, error, handleChange, handleSubmit, isAdminPage }: BlogRequestAddFormProps): React.JSX.Element {
    const [form] = Form.useForm();

    // 判断是否有错误
    const hasError = (errorCode: string) => {
        return error.code === errorCode;
    };

    const getErrorMessage = (errorCodes: string[]) => {
        const matchedCode = errorCodes.find(code => error.code === code);
        return matchedCode ? error.message : '';
    };

    return (
        <>
            {!isAdminPage && (
                <Title level={4} style={{ margin: 0 }}>
                    提交博客
                </Title>
            )}
            <Card style={{ width: '100%' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={formData}
                    // ✅ 关键修复：关闭自动校验，让提交能触发
                    validateTrigger={false}
                >
                    <Flex vertical gap={8}>
                        {/* 博主邮箱 */}
                        <Form.Item
                            label={
                                <Space size={8}>
                                    <Text style={{ fontSize: 14 }}>博主邮箱 *</Text>
                                    {hasError('blog_request_admin_email_invalid') && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {error.message}
                                        </Text>
                                    )}
                                    {hasError('blog_request_email_validation_code_invalid') && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {error.message}
                                        </Text>
                                    )}
                                </Space>
                            }
                            style={{ marginBottom: 0 }}
                            name="adminEmail"
                        >
                            <Input
                                placeholder="博主身份凭据，以及用于展示 Gravatar 头像和获取邮件通知"
                                id="adminEmail"
                                value={formData.adminEmail}
                                onChange={handleChange}
                                disabled={!isAdminPage}
                                style={{ marginTop: 8 }}
                            />
                        </Form.Item>

                        {/* 博客名称 */}
                        <Form.Item
                            label={
                                <Space size={8}>
                                    <Text style={{ fontSize: 14 }}>博客名称 *</Text>
                                    {(hasError('blog_request_name_invalid') || hasError('blog_submitted_with_same_ip')) && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {error.message}
                                        </Text>
                                    )}
                                </Space>
                            }
                            style={{ marginBottom: 0 }}
                            name="name"
                        >
                            <Input
                                placeholder="您的博客名称"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ marginTop: 8 }}
                            />
                        </Form.Item>

                        {/* RSS 地址 */}
                        <Form.Item
                            label={
                                <Space size={8}>
                                    <Text style={{ fontSize: 14 }}>RSS 地址 *</Text>
                                    {(hasError('blog_request_rss_address_invalid') ||
                                      hasError('blog_request_rss_address_black_list') ||
                                      hasError('blog_request_rss_address_exists') ||
                                      hasError('blog_request_blog_exists')) && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {error.message}
                                        </Text>
                                    )}
                                </Space>
                            }
                            style={{ marginBottom: 0 }}
                            name="rssAddress"
                        >
                            <Input
                                placeholder="用于抓取文章"
                                id="rssAddress"
                                value={formData.rssAddress}
                                onChange={handleChange}
                                style={{ marginTop: 8 }}
                            />
                        </Form.Item>

                        {/* 博客描述 */}
                        <Form.Item
                            label={
                                <Space size={8}>
                                    <Text style={{ fontSize: 14 }}>博客描述 *</Text>
                                    {hasError('blog_request_description_invalid') && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {error.message}
                                        </Text>
                                    )}
                                </Space>
                            }
                            style={{ marginBottom: 0 }}
                            name="description"
                        >
                            <TextArea
                                placeholder="描述一下您的博客，建议 100 字以内"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                style={{ marginTop: 8 }}
                            />
                        </Form.Item>

                        {/* 承诺 */}
                        <Form.Item style={{ marginBottom: 0 }} name="promise">
                            <Space size={8} align="center">
                                <Radio.Group
                                    value={formData.promise}
                                    onChange={(e) => handleChange({ target: { name: 'promise', value: e.target.value } } as any)}
                                >
                                    <Radio value="yes">
                                        <Text style={{ fontSize: 14 }}>「我承诺十年不停更，十年不闭站」</Text>
                                    </Radio>
                                </Radio.Group>
                                {hasError('promise_not_selected') && (
                                    <Text type="danger" style={{ fontSize: 14 }}>
                                        {error.message}
                                    </Text>
                                )}
                            </Space>
                        </Form.Item>

                        {/* 提交按钮 */}
                        <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>

                        {/* 联系站长 */}
                        {!isAdminPage && (
                            <div style={{ marginTop: 8 }}>
                                <Text style={noticeStyle}>
                                    <Link href="mailto:support@boyouquan.com?subject=提交博客时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">
                                        提交博客遇到问题？我要联系站长！
                                    </Link>
                                </Text>
                            </div>
                        )}
                    </Flex>
                </Form>
            </Card>
        </>
    );
}