import React from 'react';
import { Card, Typography, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface ArticleProps {
    title: string;
    content: React.ReactNode;
    publishedAt?: string;
}

export default function Article({ title, content, publishedAt }: ArticleProps): React.JSX.Element {
    return (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* 文章头部 */}
            <div className="article-header">
                <Title level={4} style={{ margin: 0 }}>
                    {title}
                </Title>
                {publishedAt && (
                    <Space size="small" style={{ marginTop: 10 }}>
                        <CalendarOutlined style={{ color: '#8c8c8c' }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {publishedAt}
                        </Text>
                    </Space>
                )}
            </div>

            {/* 文章内容卡片 */}
            <Card>
                {typeof content === 'string' ? (
                    <Paragraph style={{ marginBottom: 0, color: 'rgba(0, 0, 0, 0.85)' }}>
                        {content}
                    </Paragraph>
                ) : (
                    content
                )}
            </Card>
        </Space>
    );
}