import React, { useState, useEffect } from 'react';
import { Card, Flex, Typography, Input, Button, Form, Space } from 'antd';
import { FormError } from '../../types';

const { Text, Title, Link } = Typography;

const noticeStyle: React.CSSProperties = { marginTop: '18px', fontSize: 12 };

interface BlogRequestEmailValidationFormProps {
    formData: Record<string, string>;
    error: FormError;
    adminEmailInputRef: React.RefObject<HTMLInputElement>;
    sendCodeInputRef: React.RefObject<HTMLButtonElement>;
    emailValidationCodeInputRef: React.RefObject<HTMLInputElement>;
    emailValidationButtonRef: React.RefObject<HTMLButtonElement>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleValidationButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
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
    
    const [countdown, setCountdown] = useState<number>(0);
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

    const hasError = (errorCodes: string[]) => {
        return errorCodes.some(code => error.code === code);
    };

    const getErrorMessage = (errorCodes: string[]) => {
        const matchedCode = errorCodes.find(code => error.code === code);
        return matchedCode ? error.message : '';
    };

    // ==============================================
    // 【修复】只有邮箱验证成功，才启动倒计时！
    // ==============================================
    const handleSendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // 先执行父组件的校验逻辑
        handleValidationButtonClick(e);

        // ================= 关键修复 =================
        // 如果有错误 → 不启动倒计时、不显示验证码框
        if (error.code || !formData.adminEmail) {
            return;
        }

        // 只有校验通过，才执行下面逻辑
        setIsCodeSent(true);
        setCountdown(60);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    return (
        <>
            {!isAdminPage && (
                <Title level={4} style={{margin: 0}}>
                    验证邮箱
                </Title>
            )}
            <Card style={{ width: '100%' }}>
                <Form layout="vertical" onSubmitCapture={handleSubmit as any}>
                    <Flex vertical gap={8}>
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

                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button 
                                type="primary" 
                                ref={sendCodeInputRef} 
                                onClick={handleSendCode}
                                disabled={countdown > 0}
                            >
                                {countdown > 0 ? `${countdown} 秒后重新发送` : '发送验证码'}
                            </Button>
                        </Form.Item>

                        {isCodeSent && (
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
                                    ref={emailValidationCodeInputRef}
                                    type="number"
                                    name="emailVerificationCode"
                                    placeholder="上述邮箱收到的 6 位验证码"
                                    id="emailVerificationCode"
                                    value={formData.emailVerificationCode || ''}
                                    onChange={handleChange}
                                    style={{ marginTop: 8 }}
                                />
                            </Form.Item>
                        )}

                        {isCodeSent && (
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button 
                                    ref={emailValidationButtonRef}
                                    type="primary" 
                                    onClick={handleSubmit}
                                >
                                    验证
                                </Button>
                            </Form.Item>
                        )}

                        {!isAdminPage && (
                            <div style={{ marginTop: 8 }}>
                                <Link style={{fontSize: 12}} href="mailto:support@boyouquan.com?subject=验证邮箱时遇到了问题&body=RSS地址：%0d%0a问题描述：%0d%0a">
                                        收不到验证码？我要联系站长！
                                    </Link>
                            </div>
                        )}
                    </Flex>
                </Form>
            </Card>
        </>
    );
}