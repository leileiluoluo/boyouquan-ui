import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';
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
                <Title level={3} style={{ marginBottom: 8, marginTop: 0 }}>
                    {title}
                </Title>
                {publishedAt && (
                    <Space size="small">
                        <CalendarOutlined style={{ color: '#8c8c8c' }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {publishedAt}
                        </Text>
                    </Space>
                )}
            </div>

            {/* 文章内容卡片 */}
            <Card
                variant="borderless"
                style={{
                    backgroundColor: '#fafafa',
                    borderRadius: 12,
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
                }}
                bodyStyle={{
                    padding: 20,
                    fontSize: 14,
                    lineHeight: 1.7
                }}
            >
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