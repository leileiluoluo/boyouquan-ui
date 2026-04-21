import React, { useEffect, useState } from 'react';
import { theme, Space, Typography, Card, Flex, Row, Col, Tooltip, Divider, Avatar, Badge } from 'antd';
import {
    GlobalOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import LazyAvatar from '@components/common/avatar/LazyAvatar';
import { getBackgroundColorFromAvatar } from '@utils/CssUtil';
import { formatDateStr } from '@utils/DateUtil';
import { getBlogAddress, getGoAddress } from '@utils/PageAddressUtil';

const { Title, Link, Text, Paragraph } = Typography;
const { useToken } = theme;

export default function BlogCard({
    blog,
    posts,
    publishedAtHighlight,
    accessCountHighlight,
    createTimeHighlight,
}) {
    const [headerBg, setHeaderBg] = useState<string>('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))');

    const boxShadowValue = '0 4px 12px rgba(0,0,0,0.08)';

    const { token } = useToken();
    const blogURL = getBlogAddress(blog.domainName);

    useEffect(() => {
        if (!blog.blogAdminLargeImageURL) return;
        getBackgroundColorFromAvatar(blog.blogAdminLargeImageURL)
            .then(gradientStr => setHeaderBg(gradientStr))
            .catch(() => setHeaderBg('linear-gradient(to bottom right, var(--gray-4), rgb(230,229,229))'));
    }, []);

    return (
        <Card
            style={{
                boxShadow: boxShadowValue,
                position: 'relative',
            }}
        >
            <div style={{
                textAlign: 'center',
                backgroundColor: headerBg,
                paddingTop: 8,
            }}>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Link href={blogURL}>
                        <Avatar
                            size={60}
                            src={blog.blogAdminLargeImageURL}
                            style={{ border: '4px solid #e6f7ff' }}
                        />
                    </Link>
                    {/* Tooltip 只包裹 Badge 小圆点 */}
                    <Tooltip title={blog.statusOk ? '该博客运行正常' : '该博客无法访问'} styles={{ root: { fontSize: 12 } }}>
                        <Badge
                            dot
                            color={blog.statusOk ? '#52c41a' : 'red'}
                            offset={[10, 44]}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                // border: '2px solid #fff',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                </div>

                <Link href={blogURL}>
                    <Title level={5} style={{ marginTop: 12, marginBottom: 2 }}>
                        {blog.name}
                    </Title>
                </Link>

                <Space size={4} style={{ marginTop: 2, marginBottom: 12 }}>
                    <GlobalOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                    <Link target="_blank" href={getGoAddress(blog.address)} >
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{blog.domainName}</Text>
                    </Link>
                </Space>

                <div style={{
                    fontSize: 13,
                    color: '#8c8c8c',
                    lineHeight: '20px',
                    height: '40px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    wordBreak: 'break-all',
                }}>
                    {blog.description}
                </div>
            </div>

            <Divider style={{ margin: '12px 0' }} />
            <Flex vertical style={{ marginBottom: 4 }}>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录文章</Text></Col>
                    <Col><Text style={{ fontSize: 13 }}>{blog.postCount}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>浏览文章</Text></Col>
                    <Col><Text style={{ fontSize: 13, fontWeight: accessCountHighlight ? 500 : '', color: accessCountHighlight ? token.colorPrimary : '' }}>{blog.accessCount}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>最近更新</Text></Col>
                    <Col><Text style={{ fontSize: 13 }}>{formatDateStr(blog.latestPublishedAt)}</Text></Col>
                </Row>
                <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col><Text type="secondary" style={{ fontSize: 13 }}>收录时间</Text></Col>
                    <Col><Text style={{ fontSize: 13, fontWeight: createTimeHighlight ? 500 : '', color: createTimeHighlight ? token.colorPrimary : '' }}>{formatDateStr(blog.collectedAt)}</Text></Col>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Flex align="center">
                    <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                    <Tooltip title="该博客的服务器位置（仅供参考）" styles={{ root: { fontSize: 12 } }}>
                        <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                            {blog.blogServerLocation}
                        </Text>
                    </Tooltip>
                </Flex>
            </Flex>
        </Card>
    );
}