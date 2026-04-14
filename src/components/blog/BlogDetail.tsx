import React from 'react';
import { Fragment, Suspense, useEffect, useState, lazy } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import BlogDetailMain from './BlogDetailMain';
import BlogDetailSummary from './BlogDetailSummary';
import { redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { formatDateStr, formatDomainNameRegistrationDateStr } from '../../utils/DateUtil';
import {
    Layout, Card, Avatar, Typography, Tag, Divider, Button,
    Space, Flex, Spin, Row, Col, Statistic, Image
} from 'antd';
import {
    LikeOutlined, StarOutlined, ShareAltOutlined,
    EyeOutlined, CalendarOutlined, UserOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
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

export default function BlogDetail({ domain }: BlogDetailProps): React.JSX.Element {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [blogDetail, setBlogDetail] = useState<BlogDetailData>({});

    const fetchData = async (domainParam: string): Promise<void> => {
        const resp = await RequestUtil.get(`/api/blogs?domainName=${domainParam}`);

        if (typeof resp === 'string' || resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }

        const respBody = await resp.json();
        setBlogDetail(respBody as BlogDetailData);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    if (!loaded) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '200px' }}>
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <Fragment>
            <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
            <Content>
                <Row gutter={12}>
                    {/* 左侧个人信息 */}
                    <Col xs={24} md={6}>
                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 12,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                position: 'sticky',
                                top: 30
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

                            {/* 纯 Ant Design 实现：一行一个，两端对齐 */}
                            <Flex vertical>
                                {/* 文章收录 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>收录文章</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{blogDetail.postCount}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 粉丝 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>浏览文章</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{blogDetail.accessCount}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 获赞 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>最近更新</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{formatDateStr(blogDetail.latestPublishedAt)}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 获赞 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>收录时间</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{formatDateStr(blogDetail.collectedAt)}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 获赞 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>博客年龄</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{null !== blogDetail.domainNameRegisteredAt ? formatDomainNameRegistrationDateStr(blogDetail.domainNameRegisteredAt) : ''}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 获赞 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>收录方式</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{blogDetail.submittedInfo}</Typography.Text>
                                    </Col>
                                </Row>

                                {/* 获赞 */}
                                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                    <Col>
                                        <Typography.Text type="secondary" style={{ fontSize: 13 }}>运行状态</Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text strong style={{ fontSize: 13 }}>{blogDetail.statusOk ? '运行良好' : '无法访问'}</Typography.Text>
                                    </Col>
                                </Row>

                                <Divider style={{ margin: '12px 0' }} />

                                <Flex align="center">
                                    <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                                    <Text
                                        type="secondary"
                                        style={{ fontSize: 12, marginLeft: 4, userSelect: 'none' }}
                                    >
                                        {blogDetail.blogServerLocation}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>

                    {/* 右侧文章 */}
                    <Col xs={24} md={18}>
                        <Flex vertical gap={8}>
                            <Suspense fallback={<Spin size="large" />}>
                                <BlogPerformance domainName={domain} collectedAt={blogDetail.collectedAt} />
                                <BlogCharts domain={domain} />
                                <BlogPosts domain={domain} rssAddress={blogDetail.rssAddress} blogStatusOk={blogDetail.statusOk} />
                                <FriendBlogs domain={domain} />
                                {/* <RandomBlogs domain={domain} /> */}
                            </Suspense>
                        </Flex>
                    </Col>
                </Row>
            </Content>
        </Fragment>
    );
}