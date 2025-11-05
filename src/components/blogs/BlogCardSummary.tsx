import React from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';

const highlightStyle = { color: '#cb2e58' };

export default function BlogCardSummary({ postCount, accessCount, collectedAt, domainRegisteredAt, latestPublishedAt, publishedAtHighlight, accessCountHighlight, createTimeHighlight }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);
    const domainRegisteredAtFormatted = formatDateStr(domainRegisteredAt, true);

    return (
        <Box>
            <Flex gap="2" justify="between">
                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">文章收录</Text>
                        <Text size="2">{postCount}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">文章浏览</Text>
                        <Text size="2" color={accessCountHighlight ? "crimson" : ""}>{accessCount}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">最近更新</Text>
                        <Text size="2">{latestPublishedAtFormatted}</Text>
                    </Flex>
                </Box>

                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">{createTimeHighlight ? '建博时间' :
                            '收录时间'
                        }</Text>
                        <Text size="2" color={publishedAtHighlight || createTimeHighlight ? "crimson" : ""}>{createTimeHighlight ? domainRegisteredAtFormatted :
                            collectedAtFormatted
                        }</Text>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}