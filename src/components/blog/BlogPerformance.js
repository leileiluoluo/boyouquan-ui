import { Box, Card, Flex, Link, Progress, Text, Tooltip } from '@radix-ui/themes';
import { getYearsTillNow, getYear } from '../../utils/DateUtil';

export default function BlogPerformance({ domainName, collectedAt }) {
    const joinedYear = getYear(collectedAt);
    const years = getYearsTillNow(collectedAt);
    const value = years * 10;
    const certLink = `/certificates/${domainName}`;

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">履约进度</Text>
                <Tooltip content="点击查看履约证书">
                    <Box mt="2" maxWidth="100%">
                        <Link onClick={() => window.open(certLink, '博客集验证', 'height=800,width=960,top=0,right=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')}>
                            <Flex justify="between" mb="2" style={{ overflowX: 'auto' }}>
                                <Text size="2" color="gray" mr="2">{joinedYear}</Text>
                                <Text size="2" color="gray" mr="2">{joinedYear + 10}</Text>
                            </Flex>

                            <Progress color="gold" value={value} duration="3s" />

                            <Text size="1" color="gray" mt="2">* 该博客收录于 {joinedYear} 年，目前已履约 {years} 年，等级为 <Link color="gold" weight="bold">LEVEL {years}</Link></Text>
                        </Link>
                    </Box>
                </Tooltip>
            </Flex>
        </Card>
    );
};