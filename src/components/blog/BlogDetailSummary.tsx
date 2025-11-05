import React from 'react';
import { Card, Flex, Box, Text } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';

export default function BlogDetailSummary({ postCount, accessCount, latestPublishedAt, collectedAt }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex gap="1" justify="between">
                <Box>
                    <Flex direction="column" gap="1">
                        <Text size="2" color="gray">文章收录</Text>
                        <Text size="2">{postCount}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex direction="column" gap="1">
                        <Text size="2" color="gray">文章浏览</Text>
                        <Text size="2">{accessCount}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex direction="column" gap="1">
                        <Text size="2" color="gray">最近更新</Text>
                        <Text size="2">{latestPublishedAtFormatted}</Text>
                    </Flex>
                </Box>

                <Box>
                    <Flex direction="column" gap="1">
                        <Text size="2" color="gray">收录时间</Text>
                        <Text size="2">{collectedAtFormatted}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Card>
    )
}