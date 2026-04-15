import React from 'react';
import { Fragment, Suspense, useEffect, useState, lazy } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import { redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';
import {
    Layout, Card, Avatar, Typography, Divider,
    Flex, Spin, Row, Col, TimelineProps,
    Timeline
} from 'antd';
import { LoadingOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { getBackgroundColorFromAvatar } from '@utils/CssUtil';

const { Content } = Layout;
const { Text, Title, Paragraph, Link } = Typography;

const BlogPerformance = lazy(() => import('./BlogPerformance'));
const BlogCharts = lazy(() => import('./BlogCharts'));
const FriendBlogs = lazy(() => import('./FriendBlogs'));
const RandomBlogs = lazy(() => import('./RandomBlogs'));
const BlogPosts = lazy(() => import('./BlogPosts'));

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

interface BlogDetailData {
    name?: string;
    description?: string;
    blogAdminLargeImageURL?: string;
    collectedAt?: string;
    postCount?: number;
    accessCount?: number;
    latestPublishedAt?: string;
    address?: string;
    blogServerLocation?: string;
    rssAddress?: string;
    statusOk?: boolean;
    [key: string]: any;
}

const getMeta = (name: string | undefined, description: string | undefined): MetaData => {
    return {
        title: `${name || ''} - 博友圈 · 博客人的朋友圈！`,
        keywords: name || '',
        description: description || ''
    };
};

interface BlogDetailProps {
    domain: string;
}

interface TimelineItem {
    color?: string;
    icon?: React.ReactNode;
    content: string;
}

function generateTimelineProps(startYear: number): TimelineProps {
    const endYear = startYear + 10;
    const currentYear = new Date().getFullYear();

    const timelineItems: TimelineItem[] = [];

    for (let year = startYear; year <= endYear; year++) {
        const isNow = year === currentYear;
        timelineItems.push({
            content: `${year}`,
            icon: isNow ? <LoadingOutlined style={{ fontSize: '14px' }} /> : undefined,
            color: year > currentYear ? '#999' : undefined,
        });
    }

    return {
        orientation: 'horizontal',
        items: timelineItems,
        className: 'year-timeline',
    };
}

export default function BlogDetail({ domain }: BlogDetailProps): React.JSX.Element {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [blogDetail, setBlogDetail] = useState<BlogDetailData>({});
    const [headerBg, setHeaderBg] = useState<string>('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))');

    const boxShadowValue = '0 4px 12px rgba(0,0,0,0.08)';

    const joinedYear = blogDetail.collectedAt ? new Date(blogDetail.collectedAt).getFullYear() : 0;
    const targetYear = joinedYear + 10;
    const years = joinedYear
        ? Math.floor((new Date().getTime() - new Date(blogDetail.collectedAt || '').getTime()) / (365 * 24 * 60 * 60 * 1000))
        : 0;

    const timelines = generateTimelineProps(joinedYear);

    const fetchData = async (domainParam: string): Promise<void> => {
        const resp = await RequestUtil.get(`/api/blogs?domainName=${domainParam}`);
        if (typeof resp === 'string' || resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }
        const respBody = await resp.json();
        setBlogDetail(respBody);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    useEffect(() => {
        if (!loaded || !blogDetail.blogAdminLargeImageURL) return;
        getBackgroundColorFromAvatar(blogDetail.blogAdminLargeImageURL)
            .then(gradientStr => setHeaderBg(gradientStr))
            .catch(() => setHeaderBg('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))'));
    }, [loaded, blogDetail.blogAdminLargeImageURL]);

    if (!loaded) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '200px' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .year-timeline .ant-timeline-item {
                        display: none !important;
                    }
                    .year-timeline .ant-timeline-item:first-child,
                    .year-timeline .ant-timeline-item:last-child {
                        display: flex !important;
                    }
                    /* 标记当前年份节点，手机端强制显示 */
                    .year-timeline .ant-timeline-item:has(.anticon-clock-circle) {
                        display: flex !important;
                    }
                }
            `}</style>
            <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
            <Content id="blog-user-info">
                <Row gutter={[12, 16]}>
                    <Col xs={24} md={6} style={{ marginBottom: 2 }}>
                        <Card
                            bordered={false}
                            style={{
                                boxShadow: boxShadowValue,
                                position: 'sticky',
                                top: 30,
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                <Link href={blogDetail.address}>
                                    <Avatar
                                        size={60}
                                        src={blogDetail.blogAdminLargeImageURL}
                                        style={{ border: '4px solid #e6f7ff' }}
                                    />
                                </Link>
                                <Link href={blogDetail.address}>
                                    <Title level={5} style={{ marginTop: 12, marginBottom: 10 }}>
                                        {blogDetail.name}
                                    </Title>
                                </Link>
                                <Paragraph type="secondary" style={{ fontSize: 13 }}>
                                    {blogDetail.description}
                                </Paragraph>
                            </div>
                            <Divider style={{ margin: '12px 0' }} />
                            <Flex vertical>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录文章</Text></Col>
                                    <Col><Text strong style={{ fontSize: 13 }}>{blogDetail.postCount}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>浏览文章</Text></Col>
                                    <Col><Text strong style={{ fontSize: 13 }}>{blogDetail.accessCount}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>最近更新</Text></Col>
                                    <Col><Text strong style={{ fontSize: 13 }}>{formatDateStr(blogDetail.latestPublishedAt)}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录时间</Text></Col>
                                    <Col><Text strong style={{ fontSize: 13 }}>{formatDateStr(blogDetail.collectedAt)}</Text></Col>
                                </Row>
                                <Divider style={{ margin: '12px 0' }} />
                                <Flex align="center">
                                    <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                                    <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                                        {blogDetail.blogServerLocation}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>

                    <Col xs={24} md={18}>
                        <div
                            style={{
                                background: headerBg,
                                borderRadius: 6,
                                padding: '18px 22px',
                                marginBottom: 16,
                                border: '1px solid #e8e8e8',
                                minHeight: 110,
                                transition: 'background 0.3s ease'
                            }}
                        >
                            <Flex vertical gap={12}>
                                <Flex justify="space-between" align="center">
                                    <Title level={5} style={{ margin: 0 }}>{blogDetail.name}</Title>
                                    <div style={{
                                        background: '#faad14',
                                        color: '#fff',
                                        padding: '2px 10px',
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: 'bold'
                                    }}>
                                        履约 {years} 年
                                    </div>
                                </Flex>

                                <Timeline {...timelines} mode="end" />
                            </Flex>
                        </div>

                        <Flex vertical gap={16}>
                            <Suspense fallback={<Spin size="large" />}>
                                <BlogPosts domain={domain} rssAddress={blogDetail.rssAddress} blogStatusOk={blogDetail.statusOk} />
                                <BlogCharts domain={domain} />
                                <FriendBlogs domain={domain} />
                            </Suspense>
                        </Flex>
                    </Col>
                </Row>
            </Content>
        </>
    );
}