import React from 'react';
import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Typography, Tag, Tooltip, Space } from 'antd';

const { Title, Text, Link } = Typography;

export default function FriendBlogs({ domain }) {
    const [linksFromMe, setLinksFromMe] = useState([]);
    const [linksToMe, setLinksToMe] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blog-intimacies/my-friend-links?blogDomainName=${domain}`);

        const respBody = await resp.json();
        setLinksFromMe(respBody.linksFromMe);
        setLinksToMe(respBody.linksToMe);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    // 渲染链接列表的函数
    const renderLinks = (links) => {
        if (links.length === 0) {
            return <Text type="secondary" style={{ fontSize: 14 }}>无</Text>;
        }

        return (
            <Space size={4} wrap>
                {links.map((blog, index) => (
                    <Link key={blog.domainName} href={`/blogs/${blog.domainName}`} style={{ fontSize: 14 }}>
                        <Tag color="blue">{blog.name}</Tag>
                    </Link>
                ))}
            </Space>
        );
    };

    if (linksFromMe.length === 0 && linksToMe.length === 0) {
        return null;
    }

    return (
        <Card hoverable>
            <Flex vertical gap={8}>
                <Tooltip title="连接系数采集自博客的友链数据，每个月初更新一次" placement="top">
                    <Title level={5} style={{ marginTop: 0 }}>连接系数</Title>
                </Tooltip>
                <Flex vertical gap={8}>
                    <div style={{ overflowX: 'auto' }}>
                        <Space align="center" size={4} wrap>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                                链出 (<Link style={{ color: '#8c8c8c' }}>{linksFromMe.length}</Link>) →
                            </Text>
                            {renderLinks(linksFromMe)}
                        </Space>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <Space align="center" size={4} wrap>
                            <Text type="secondary" style={{ fontSize: 14 }}>
                                链入 (<Link style={{ color: '#8c8c8c' }}>{linksToMe.length}</Link>) ←
                            </Text>
                            {renderLinks(linksToMe)}
                        </Space>
                    </div>
                </Flex>
            </Flex>
        </Card>
    );
}