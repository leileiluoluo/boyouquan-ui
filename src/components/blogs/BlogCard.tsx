import React, { useEffect, useState } from 'react';
import { Space, Typography, Card, Flex, Row, Col, Tooltip, Divider, Avatar } from 'antd';
import BlogCardDescription from './BlogCardDescription';
import BlogCardFooter from './BlogCardFooter';
import BlogCardHeader from './BlogCardHeader';
import BlogCardLatestPosts from './BlogCardLatestPosts';
import BlogCardSummary from './BlogCardSummary';
import {
    LinkOutlined,
    GlobalOutlined,
    FileTextOutlined,
    EyeOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import LazyAvatar from '@components/common/avatar/LazyAvatar';
import { getBackgroundColorFromAvatar } from '@utils/CssUtil';
import { formatDateStr } from '@utils/DateUtil';
import { getBlogAddress, getGoAddress } from '@utils/PageAddressUtil';

const { Title, Link, Text, Paragraph } = Typography;

export default function BlogCard({
    blog,
    posts,
    publishedAtHighlight,
    accessCountHighlight,
    createTimeHighlight,
}) {
    const [headerBg, setHeaderBg] = useState<string>('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))');

    const boxShadowValue = '0 4px 12px rgba(0,0,0,0.08)';

    const blogURL = getBlogAddress(blog.domainName);

    useEffect(() => {
        if (!blog.blogAdminLargeImageURL) return;
        getBackgroundColorFromAvatar(blog.blogAdminLargeImageURL)
            .then(gradientStr => setHeaderBg(gradientStr))
            .catch(() => setHeaderBg('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))'));
    }, []);

    return (
        <Card
            bordered={false}
            style={{
                boxShadow: boxShadowValue,
                position: 'sticky',
                top: 30,
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Link href={blogURL}>
                    <Avatar
                        size={60}
                        src={blog.blogAdminLargeImageURL}
                        style={{ border: '4px solid #e6f7ff' }}
                    />
                </Link>

                <Link
                    href={blogURL}
                >
                    <Title level={5} style={{ marginTop: 12, marginBottom: 2 }}>
                        {blog.name}
                    </Title>
                </Link>

                <Space style={{ marginTop: 2, marginBottom: 12 }}>
                    <LinkOutlined style={{ fontSize: 12 }} />
                    <Link
                        target="_blank"
                        href={blog.address}
                        style={{ fontSize: 12 }}
                    >
                        {blog.domainName}
                    </Link>
                </Space>

                <div
                    style={{
                        fontSize: 13,
                        color: '#8c8c8c',
                        lineHeight: '20px',    // 行高
                        height: '40px',        // 固定两行高度（20×2）
                        display: '-webkit-box',
                        WebkitLineClamp: 2,    // 只显示2行
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',    // 超出隐藏
                        wordBreak: 'break-all',
                    }}
                >
                    {blog.description}
                </div>
            </div>

            <Divider style={{ margin: '12px 0' }} />
            <Flex vertical>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录文章</Text></Col>
                    <Col><Text strong style={{ fontSize: 13 }}>{blog.postCount}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>浏览文章</Text></Col>
                    <Col><Text strong style={{ fontSize: 13 }}>{blog.accessCount}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>最近更新</Text></Col>
                    <Col><Text strong style={{ fontSize: 13 }}>{formatDateStr(blog.latestPublishedAt)}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录时间</Text></Col>
                    <Col><Text strong style={{ fontSize: 13 }}>{formatDateStr(blog.collectedAt)}</Text></Col>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Flex align="center">
                    <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                    <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                        {blog.blogServerLocation}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}