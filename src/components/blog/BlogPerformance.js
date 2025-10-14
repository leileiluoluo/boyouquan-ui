import { Box, Card, Flex, Link, Progress, Text, Tooltip } from '@radix-ui/themes';
import { getYearsTillNow } from '../../utils/DateUtil';

export default function BlogPerformance({ domainName, collectedAt }) {
    const years = getYearsTillNow(collectedAt);
    const value = years * 10;
    const certLink = `https://www.boyouquan.com/certificates/${domainName}`;

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">履约进度</Text>
                <Box mt="2" maxWidth="100%">
                    <Tooltip content="点击查看证书">
                        <Link href={certLink} target="_blank">
                            <Progress color="gold" value={value} duration="3s" />
                        </Link>
                    </Tooltip>
                </Box>
            </Flex>
        </Card>
    );
};