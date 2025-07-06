import { Card, Flex, Box, Text } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';

const blogStatisticsStyle = { fontSize: '16px', color: 'var(--secondary)' };

export default function BlogDetailSummary({ postCount, accessCount, latestPublishedAt, collectedAt }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex gap="1" justify="between">
                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">文章收录</Text>
                        <Text size="2">{postCount}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Flex direction="column">
                        <Text size="2" color="gray">文章浏览</Text>
                        <Text size="2">{accessCount}</Text>
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
                        <Text size="2" color="gray">收录时间</Text>
                        <Text size="2">{collectedAtFormatted}</Text>
                    </Flex>
                </Box>
            </Flex>
        </Card>
        // <footer className="blog-detail-summary">
        //     <div className="flex-item one">
        //         <p style={blogStatisticsStyle}>文章收录</p>
        //         <p>{postCount}</p>
        //     </div>
        //     <div className="flex-item two">
        //         <p style={blogStatisticsStyle}>文章浏览</p>
        //         <p>{accessCount}</p>
        //     </div>
        //     <div className="flex-item three">
        //         <p style={blogStatisticsStyle}>最近更新</p>
        //         <p>{latestPublishedAtFormatted}</p>
        //     </div>
        //     <div className="flex-item four">
        //         <p style={blogStatisticsStyle}>收录时间</p>
        //         <p>{collectedAtFormatted}</p>
        //     </div>
        // </footer>
    )
}