import { Box, Card, Flex, Link, Progress, Text, Tooltip } from '@radix-ui/themes';
import { getYearsTillNow, getYear } from '../../utils/DateUtil';

function generateYears(startYear) {
    return Array.from({ length: 11 }, (_, index) => startYear + index);
}

export default function BlogPerformance({ domainName, collectedAt }) {
    const joinedYear = getYear(collectedAt);
    const years = getYearsTillNow(collectedAt);
    const yearsArray = generateYears(joinedYear);
    const value = years * 13;
    const certLink = `/certificates/${domainName}`;

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">履约进度</Text>
                <Tooltip content="点击查看履约证书">
                    <Box mt="2" maxWidth="100%">
                        <Link onClick={() => window.open(certLink, '博客集验证', 'height=800,width=470,top=0,right=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')}>
                            <Flex justify="between" mb="2" style={{ overflowX: 'auto' }}>
                                {yearsArray.map((year) => (
                                    <Text key={year} size="2" color="gray" mr="2">{year}</Text>
                                ))}
                            </Flex>

                            <Progress color="gold" value={value} duration="3s" />
                        </Link>
                    </Box>
                </Tooltip>
            </Flex>
        </Card>
    );
};