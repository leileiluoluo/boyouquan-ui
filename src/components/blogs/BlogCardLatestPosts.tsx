import React from 'react';
import { Flex, Typography, List } from 'antd';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

const { Text, Link, Paragraph } = Typography;

export default function BlogCardLatestPosts({ statusOk, posts }) {
    return (
        <div style={{ marginTop: 4, marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 14 }}>最新文章</Text>
            <List
                size="small"
                dataSource={posts}
                renderItem={(post, index) => (
                    <List.Item style={{ padding: '4px 0' }}>
                        <Flex gap={8} align="center" style={{ width: '100%' }}>
                            <Text type="secondary" style={{ fontSize: 14, flexShrink: 0 }}>
                                {formatDateStr(post.publishedAt, true)}
                            </Text>
                            <Paragraph
                                ellipsis={{ rows: 1, expandable: false }}
                                style={{
                                    fontSize: 14,
                                    marginBottom: 0,
                                    flex: 1
                                }}
                            >
                                {statusOk ? (
                                    <Link href={getGoAddress(post.link)} target="_blank">
                                        {post.title}
                                    </Link>
                                ) : (
                                    <Link href={getAbstractAddress(post.link)}>
                                        {post.title}
                                    </Link>
                                )}
                            </Paragraph>
                        </Flex>
                    </List.Item>
                )}
            />
        </div>
    );
}