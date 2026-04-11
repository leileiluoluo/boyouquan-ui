import React from 'react';
import { Card, Flex, Typography, Input, Button, Form, Space } from 'antd';
import { FormError } from '../../types';

const { Text, Title, Link } = Typography;

const noticeStyle: React.CSSProperties = { marginTop: '18px', fontSize: '12px' };

interface BlogRequestEmailValidationFormProps {
    formData: Record<string, string>;
    error: FormError;
    adminEmailInputRef: React.RefObject<HTMLInputElement>;
    sendCodeInputRef: React.RefObject<HTMLButtonElement>;
    emailValidationCodeInputRef: React.RefObject<HTMLInputElement>;
    emailValidationButtonRef: React.RefObject<HTMLButtonElement>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleValidationButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isAdminPage?: string | boolean;
}

export default function BlogRequestEmailValidationForm({ 
    formData, 
    error, 
    adminEmailInputRef, 
    sendCodeInputRef, 
    emailValidationCodeInputRef, 
    emailValidationButtonRef, 
    handleChange, 
    handleValidationButtonClick, 
    handleSubmit, 
    isAdminPage 
}: BlogRequestEmailValidationFormProps): React.JSX.Element {
    
    const hasError = (errorCodes: string[]) => {
        return errorCodes.some(code => error.code === code);
    };

    const getErrorMessage = (errorCodes: string[]) => {
        const matchedCode = errorCodes.find(code => error.code === code);
        return matchedCode ? error.message : '';
    };

    return (
        <>
            {!isAdminPage && (
                <Title level={4} style={{ fontWeight: 'bold' }}>
                    验证邮箱
                </Title>
            )}
            <Card style={{ width: '100%' }}>
                <Form layout="vertical" onSubmitCapture={handleSubmit}>
                    <Flex vertical gap={8}>
                        {/* 博主邮箱 */}
                        <Form.Item
                            label={
                                <Space size={8}>
                                    <Text style={{ fontSize: 14 }}>博主邮箱 *</Text>
                                    {hasError(['blog_request_admin_email_invalid', 'blog_request_email_validation_code_limit_exceed']) && (
                                        <Text type="danger" style={{ fontSize: 14 }}>
                                            {getErrorMessage(['blog_request_admin_email_invalid', 'blog_request_email_validation_code_limit_exceed'])}
                                        </Text>
                                    )}
                                </Space>
                            }
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                ref={adminEmailInputRef}
                                name="adminEmail"
                                placeholder="博主身份凭据，用于鉴定博客拥有权、展示 Gravatar 头像和获取邮件通知"
                                id="adminEmail"
                                value={formData.adminEmail || ''}
                                onChange={handleChange}
                                style={{ marginTop: 8 }}
                            />
                        </Form.Item>

                        {/* 发送验证码按钮 */}
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button 
                                type="default" 
                                ref={sendCodeInputRef} 
                                onClick={handleValidationButtonClick}
                            >
                                发送验证码
                            </Button>
                        </Form.Item>

                        {/* 验证码输入框 */}
                        <div ref={emailValidationCodeInputRef} style={{ display: formData.emailVerificationCode ? 'block' : 'none' }}>
                            <Form.Item
                                label={
                                    <Space size={8}>
                                        <Text style={{ fontSize: 14 }}>验证码 *</Text>
                                        {hasError(['blog_request_email_validation_code_invalid']) && (
                                            <Text type="danger" style={{ fontSize: 14 }}>
                                                {error.message}
                                            </Text>
                                        )}
                                    </Space>
                                }
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    ref={emailValidationCodeInputRef as any}
                                    type="number"
                                    name="emailVerificationCode"
                                    placeholder="上述邮箱收到的 6 位验证码"
                                    id="emailVerificationCode"
                                    value={formData.emailVerificationCode || ''}
                                    onChange={handleChange}
                                    style={{ marginTop: 8 }}
                                />
                            </Form.Item>
                        </div>

                        {/* 验证按钮 */}
                        <div ref={emailValidationButtonRef} style={{ display: formData.emailVerificationCode ? 'block' : 'none' }}>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button 
                                    type="primary" 
                                    onClick={handleSubmit}
                                >
                                    验证
                                </Button>
                            </Form.Item>
                        </div>

                        {/* 联系站长 */}
                        {!isAdminPage && (
                            <div style={{ marginTop: 8 }}>
                                <Text style={noticeStyle}>
                                    <Link href="mailto:support@boyouquan.com?subject=验证邮箱时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">
                                        收不到验证码？我要联系站长！
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