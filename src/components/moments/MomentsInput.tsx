import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Button, Avatar, Typography, Flex, Space, message, Tooltip, Upload } from 'antd';
import { PictureOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { isEmailValid } from '../../utils/EmailUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { MOMENTS_ADDRESS } from '../../utils/PageAddressUtil';
import { getCookie, setCookie } from '../../utils/CookieUtil';

const { Text, Link } = Typography;
const { TextArea } = Input;

export default function MomentsInput() {
    const [form] = Form.useForm();
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [blogInfo, setBlogInfo] = useState(null);
    const [email, setEmail] = useState(() => getCookie('email') || '');
    const [description, setDescription] = useState('');
    const [blogDomainName, setBlogDomainName] = useState(null);
    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);

    const emailValidation = (emailValue: string) => {
        if (!emailValue || emailValue.trim() === '') {
            return { code: 'email_invalid', message: '未提供邮箱！' };
        }

        if (!isEmailValid(emailValue.trim())) {
            return { code: 'email_invalid', message: '邮箱格式不正确！' };
        }

        return null;
    }

    const getBlogInfo = async (adminEmail: string) => {
        const resp = await RequestUtil.get(`/api/blogs/by-admin-email?adminEmail=${adminEmail}`);

        if (resp.status === 200) {
            const respBody = await resp.json();
            if (respBody.length > 0) {
                setBlogInfo(respBody[0]);
                setBlogDomainName(respBody[0].domainName);
            } else {
                setBlogInfo(null);
                setBlogDomainName(null);
            }
        }
    }

    const submit = async () => {
        setSubmitButtonDisabled(true);
        const formDataToSend = new FormData();

        formDataToSend.append('blogDomainName', blogDomainName);
        formDataToSend.append('description', description);
        formDataToSend.append('file', file);
        const resp = await RequestUtil.post('/api/moments', formDataToSend, {});

        if (resp.status === 413) {
            message.error('文件不能大于 10 M');
        } else if (resp.status !== 201) {
            const respBody = await resp.json();
            message.error(respBody.message || '发布失败');
        } else {
            message.success('发布成功！');
            setCookie('email', email);
            redirectTo(MOMENTS_ADDRESS);
        }

        setSubmitButtonDisabled(false);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const error = emailValidation(newEmail);
        if (!error) {
            getBlogInfo(newEmail);
        } else {
            setBlogInfo(null);
            setBlogDomainName(null);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = () => {
        form.validateFields().then(() => {
            const emailError = emailValidation(email);
            if (emailError) {
                message.error(emailError.message);
                return;
            }

            if (!description || description.trim() === '') {
                message.error('未提供描述！');
                return;
            }

            if (description.trim().length < 10) {
                message.error('描述不应少于 10 个字！');
                return;
            }

            if (!blogInfo || !blogDomainName) {
                message.error('未查询到对应的博客，请输入正确的邮箱！');
                return;
            }

            if (!file) {
                message.error('未上传图片！');
                return;
            }

            submit();
        });
    };

    const handleFileChange = ({ file: uploadFile, fileList: newFileList }) => {
        if (uploadFile.status === 'removed') {
            setFile(null);
            setFileList([]);
            return;
        }

        if (uploadFile.size > 10 * 1024 * 1024) {
            message.error('文件不能大于 10 M');
            return;
        }

        setFile(uploadFile.originFileObj);
        setFileList(newFileList);
    };

    useEffect(() => {
        if (email) {
            const error = emailValidation(email);
            if (!error) {
                getBlogInfo(email);
            }
        }
    }, [email]);

    return (
        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
            <Form form={form} layout="vertical">
                <Flex gap={16} align="flex-start" wrap="wrap">
                    {/* 左侧头像和博客信息 */}
                    <div style={{ minWidth: '100px', textAlign: 'center' }}>
                        <Space direction="vertical" size={8} align="center">
                            {blogInfo ? (
                                <Link href="#" style={{ display: 'inline-block' }}>
                                    <Avatar
                                        size={36}
                                        src={blogInfo.blogAdminLargeImageURL}
                                        icon={<UserOutlined />}
                                    />
                                </Link>
                            ) : (
                                <Avatar size={36} icon={<UserOutlined />} />
                            )}
                            {blogInfo ? (
                                <Link href="#" style={{ fontSize: 12 }}>
                                    {blogInfo.name}
                                </Link>
                            ) : (
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    匿名用户
                                </Text>
                            )}
                        </Space>
                    </div>

                    {/* 右侧表单 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Space direction="vertical" size={12} style={{ width: '100%' }}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: '请输入邮箱' },
                                    { type: 'email', message: '邮箱格式不正确' }
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input
                                    placeholder="请输入邮箱"
                                    value={email}
                                    onChange={handleEmailChange}
                                    autoComplete="email"
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                rules={[
                                    { required: true, message: '请写一段话' },
                                    { min: 10, message: '描述不应少于 10 个字' }
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="请写一段话 ..."
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    showCount
                                    maxLength={500}
                                />
                            </Form.Item>

                            <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                                <Space size={12} align="center">
                                    <Upload
                                        fileList={fileList}
                                        onChange={handleFileChange}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        accept="image/*"
                                    >
                                        <Tooltip title="请上传一张图片">
                                            <Button icon={<PictureOutlined />}>上传图片</Button>
                                        </Tooltip>
                                    </Upload>
                                    {file && (
                                        <Space size={4} align="center">
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {file.name}
                                            </Text>
                                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                        </Space>
                                    )}
                                </Space>

                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    disabled={submitButtonDisabled}
                                    loading={submitButtonDisabled}
                                >
                                    发布
                                </Button>
                            </Flex>
                        </Space>
                    </div>
                </Flex>
            </Form>
        </div>
    )
}