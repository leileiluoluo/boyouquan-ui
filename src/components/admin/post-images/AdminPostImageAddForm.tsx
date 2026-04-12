import React from 'react';
import { Card, Form, Input, Button, Typography, Space, Radio, Row, Col, Image } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function AdminPostImageAddForm({ postInfo, postImages, formData, error, handleChange, handleSubmit, isAdminPage }) {
    return (
        <>
            {!isAdminPage && (
                <Title level={3} style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    文章配图
                </Title>
            )}
            <Card style={{ marginBottom: '16px' }}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        {/* Article Title */}
                        <div>
                            <Space align="center" size="small">
                                <Text strong>文章标题 *</Text>
                                {error.code && (
                                    <Text type="danger">{error.message}</Text>
                                )}
                            </Space>
                            <div style={{ marginTop: '8px' }}>
                                <Input value={postInfo.title} readOnly />
                            </div>
                        </div>

                        {/* Optional Images */}
                        <div>
                            <Space align="center" size="small">
                                <Text strong>可选图片 *</Text>
                            </Space>
                            
                            <Row gutter={[16, 16]} style={{ marginTop: '8px' }}>
                                {postImages.map((imageURL, index) => (
                                    <Col xs={24} md={12} key={index}>
                                        <Space size="middle" style={{ width: '100%' }}>
                                            <div style={{ 
                                                flexShrink: 0,
                                                width: '100%',
                                                maxWidth: '200px',
                                                backgroundColor: "#f3f3f3",
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                                position: 'relative'
                                            }}>
                                                <div style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                                                    <img
                                                        src={imageURL}
                                                        alt={`Option ${index + 1}`}
                                                        style={{ 
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%", 
                                                            height: "100%", 
                                                            objectFit: "cover" 
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <Radio 
                                                name="imageURL"
                                                value={imageURL}
                                                checked={formData.imageURL === imageURL}
                                                onChange={handleChange}
                                            >
                                                选择此图
                                            </Radio>
                                        </Space>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Custom Image URL */}
                        <div>
                            <Space align="center" size="small">
                                <Text strong>自定义图片地址 *</Text>
                            </Space>
                            <div style={{ marginTop: '8px' }}>
                                <Input 
                                    name="customImageURL"
                                    value={formData.customImageURL}
                                    onChange={handleChange}
                                    placeholder="请输入自定义图片URL"
                                    prefix={<FileImageOutlined />}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div style={{ marginTop: '8px' }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </div>
                    </Space>
                </Form>
            </Card>
        </>
    )
}