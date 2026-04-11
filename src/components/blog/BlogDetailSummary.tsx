import React from 'react';
import { Card, Flex, Typography } from 'antd';
import { formatDateStr } from '../../utils/DateUtil';

const { Text } = Typography;

export default function BlogDetailSummary({ postCount, accessCount, latestPublishedAt, collectedAt }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);

    return (
        <Card style={{ padding: 16, width: '100%' }}>
            <Flex justify="space-between" gap={16}>
                <Flex vertical gap={4}>
                    <Text type="secondary" style={{ fontSize: 14 }}>文章收录</Text>
                    <Text style={{ fontSize: 14 }}>{postCount}</Text>
                </Flex>

                <Flex vertical gap={4}>
                    <Text type="secondary" style={{ fontSize: 14 }}>文章浏览</Text>
                    <Text style={{ fontSize: 14 }}>{accessCount}</Text>
                </Flex>

                <Flex vertical gap={4}>
                    <Text type="secondary" style={{ fontSize: 14 }}>最近更新</Text>
                    <Text style={{ fontSize: 14 }}>{latestPublishedAtFormatted}</Text>
                </Flex>

                <Flex vertical gap={4}>
                    <Text type="secondary" style={{ fontSize: 14 }}>收录时间</Text>
                    <Text style={{ fontSize: 14 }}>{collectedAtFormatted}</Text>
                </Flex>
            </Flex>
        </Card>
    );
}