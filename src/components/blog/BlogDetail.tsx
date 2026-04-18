import React from 'react';
import { Fragment, Suspense, useEffect, useState, lazy } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import { redirectTo } from '../../utils/CommonUtil';
import { getGoAddress, NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';
import {
    theme,
    Layout, Card, Avatar, Typography, Divider,
    Flex, Spin, Row, Col, TimelineProps,
    Timeline,
    Space,
    Tooltip,
    Badge
} from 'antd';
import { LoadingOutlined, EnvironmentOutlined, LinkOutlined } from '@ant-design/icons';
import { getBackgroundColorFromAvatar } from '@utils/CssUtil';

const { Content } = Layout;
const { Text, Title, Paragraph, Link } = Typography;

const { useToken } = theme;

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
            icon: isNow ? <LoadingOutlined spin style={{ fontSize: '16px' }} /> : undefined,
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

    const { token } = useToken();

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
                /* 强制控制时间轴字体大小 - 100% 生效 */
                .year-timeline.ant-timeline-horizontal .ant-timeline-item-content {
                    font-size: 12px !important;
                    color: inherit;
                }

                /* 手机端只显示 3 个点 */
                @media (max-width: 768px) {
                    .year-timeline .ant-timeline-item {
                        display: none !important;
                    }
                    .year-timeline .ant-timeline-item:first-child,
                    .year-timeline .ant-timeline-item:last-child,
                    .year-timeline .ant-timeline-item:has(.anticon-loading) {
                        display: flex !important;
                    }
                }
            `}</style>

            <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
            <Content id="blog-user-info">
                <Row gutter={[12, 16]}>
                    <Col
                        xs={24}
                        md={6}
                        style={{
                            // marginBottom: 16,
                            display: 'flex',
                            flexDirection: 'column',    // 使子元素可以撑满高度
                        }}
                    >
                        <Card
                            style={{
                                boxShadow: boxShadowValue,
                                width: '100%',
                                // position: '-webkit-sticky',
                                position: 'sticky',
                                top: 22,
                                // 让卡片自身不限制高度，跟随内容撑开
                                // height: 'auto',
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: 16 }}>

                                <Tooltip title={blogDetail.statusOk ? '该博客运行正常' : '该博客无法访问'} styles={{ root: { fontSize: 12 } }}>
                                    <Badge
                                        dot
                                        color={blogDetail.statusOk ? '#52c41a' : 'red'}
                                        offset={[0, 56]}
                                        style={{
                                            border: '2px solid #fff',
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <Link href={getGoAddress(blogDetail.address)}>
                                            <Avatar
                                                size={60}
                                                src={blogDetail.blogAdminLargeImageURL}
                                                style={{ border: '4px solid #e6f7ff' }}
                                            />
                                        </Link>
                                    </Badge>
                                </Tooltip>

                                <Link
                                    target="_blank"
                                    href={getGoAddress(blogDetail.address)}
                                >
                                    <Title level={4} style={{ marginTop: 12, marginBottom: 2 }}>
                                        {blogDetail.name}
                                    </Title>
                                </Link>

                                <Space style={{ marginTop: 2, marginBottom: 12 }}>
                                    <LinkOutlined style={{ fontSize: 12 }} />
                                    <Link
                                        target="_blank"
                                        href={getGoAddress(blogDetail.address)}
                                        style={{ fontSize: 12 }}
                                    >
                                        {blogDetail.domainName}
                                    </Link>
                                </Space>

                                <Paragraph type="secondary" style={{ fontSize: 13 }}>
                                    {blogDetail.description}
                                </Paragraph>
                            </div>

                            <Divider style={{ margin: '12px 0' }} />
                            <Flex vertical>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录方式</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{blogDetail.submittedInfo}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录文章</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{blogDetail.postCount}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>浏览文章</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{blogDetail.accessCount}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>最近更新</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{formatDateStr(blogDetail.latestPublishedAt)}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录时间</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{formatDateStr(blogDetail.collectedAt)}</Text></Col>
                                </Row>
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col><Text type="secondary" style={{ fontSize: 13 }}>域名年份</Text></Col>
                                    <Col><Text style={{ fontSize: 13 }}>{formatDateStr(blogDetail.domainNameRegisteredAt)}</Text></Col>
                                </Row>
                                <Divider style={{ margin: '12px 0' }} />
                                <Flex align="center">
                                    <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                                    <Tooltip title="该博客的服务器位置（仅供参考）" styles={{ root: { fontSize: 12 } }}>
                                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                                            {blogDetail.blogServerLocation}
                                        </Text>
                                    </Tooltip>
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
                                    <Title level={5} style={{ margin: 0 }}>履约进度</Title>
                                    <div style={{
                                        background: token.colorPrimary,
                                        color: '#fff',
                                        padding: '2px 10px',
                                        borderRadius: 20,
                                        fontSize: 12,
                                        fontWeight: 'bold'
                                    }}>
                                        已履约 {years} 年
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