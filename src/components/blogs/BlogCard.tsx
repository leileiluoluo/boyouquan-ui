import React, { useEffect, useState } from 'react';
import { Typography, Card, Flex, Row, Col, Tooltip } from 'antd';
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
} from '@ant-design/icons';
import LazyAvatar from '@components/common/avatar/LazyAvatar';
import { getBackgroundColorFromAvatar } from '@utils/CssUtil';
import { formatDateStr } from '@utils/DateUtil';
import { getBlogAddress, getGoAddress } from '@utils/PageAddressUtil';

const { Link, Text, Paragraph } = Typography;

export default function BlogCard({
    blog,
    posts,
    publishedAtHighlight,
    accessCountHighlight,
    createTimeHighlight,
}) {
    const [headerBg, setHeaderBg] = useState<string>('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))');

    useEffect(() => {
        if (!blog.blogAdminLargeImageURL) return;
        getBackgroundColorFromAvatar(blog.blogAdminLargeImageURL)
            .then(gradientStr => setHeaderBg(gradientStr))
            .catch(() => setHeaderBg('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))'));
    }, []);

    return (
        <Card
            hoverable
            bordered={false}
        >
            <Flex vertical gap={18}>
                {/* 头像 + 名称 + 域名 */}
                <Flex gap={14} align="center">
                    <Link
                        href={getBlogAddress(blog.domainName)}>
                        <LazyAvatar
                            style={{
                                width: 48,
                                height: 48,
                                boxShadow: '0 3px 10px rgba(0,0,0,0.06)'
                            }}
                            src={blog.blogAdminLargeImageURL}
                            shape="circle"
                        />
                    </Link>

                    <Flex vertical gap={4}>
                        <Link
                            href={getBlogAddress(blog.domainName)}
                            strong
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: '#1f2937',
                                textDecoration: 'none',
                            }}
                        >
                            {blog.name}
                        </Link>

                        <Flex gap={6} align="center">
                            <GlobalOutlined style={{ fontSize: 13, color: '#6b7280' }} />
                            <Link
                                target="_blank"
                                href={getGoAddress(blog.address)}
                                style={{
                                    fontSize: 13,
                                    color: '#6b7280',
                                    textDecoration: 'none',
                                }}
                            >
                                {blog.domainName}
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>

                {/* 描述区块：更深一层灰，分层质感 */}
                <div
                    style={{
                        padding: '11px 14px',
                        background: headerBg,
                        borderRadius: 12,
                    }}
                >
                    <Paragraph
                        ellipsis={{ rows: 1 }}
                        style={{
                            fontSize: 14,
                            color: '#4b5563',
                            margin: 0,
                            lineHeight: 1.6,
                        }}
                    >
                        {blog.description}
                    </Paragraph>
                </div>

                {/* 统计数据 */}
                <Row gutter={[12, 12]}>
                    <Col span={6}>
                        <Flex vertical align="center" gap={3}>
                            <Text style={{ fontSize: 12, color: '#71717a' }}>收录文章</Text>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{blog.postCount}</Text>
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical align="center" gap={3}>
                            <Text style={{ fontSize: 12, color: '#71717a' }}>浏览文章</Text>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{blog.accessCount}</Text>
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical align="center" gap={3}>
                            <Text style={{ fontSize: 12, color: '#71717a' }}>最近更新</Text>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{formatDateStr(blog.latestPublishedAt)}</Text>
                        </Flex>
                    </Col>
                    <Col span={6}>
                        <Flex vertical align="center" gap={3}>
                            <Text style={{ fontSize: 12, color: '#71717a' }}>收录时间</Text>
                            <Text style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{formatDateStr(blog.domainNameRegisteredAt, true)}</Text>
                        </Flex>
                    </Col>
                </Row>

                {/* 底部分割+状态 */}
                <Flex
                    justify="space-between"
                    align="center"
                    style={{
                        paddingTop: 10,
                        borderTop: '1px solid #e5e7eb'
                    }}
                >
                    <Tooltip title={blog.statusTooltip}>
                        <Flex align="center" gap={5}>
                            <div
                                style={{
                                    width: 9,
                                    height: 9,
                                    borderRadius: '50%',
                                    backgroundColor: blog.statusOk ? '#10b981' : '#ef4444',
                                }}
                            />
                            <Text style={{ fontSize: 12, color: '#6b7280' }}>
                                {blog.statusOk ? '运行良好' : '无法访问'}
                            </Text>
                        </Flex>
                    </Tooltip>

                    <Tooltip title={blog.submittedInfoTip}>
                        <Flex align="center" gap={5}>
                            <InfoCircleOutlined style={{ fontSize: 13, color: '#9ca3af' }} />
                            <Text style={{ fontSize: 12, color: '#6b7280' }}>
                                {blog.submittedInfo}
                            </Text>
                        </Flex>
                    </Tooltip>
                </Flex>
            </Flex>
        </Card>
    );
}