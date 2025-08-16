import { Flex, Box, Text, Card, DataList, Link } from '@radix-ui/themes';
import { getBlogAddress } from '../../utils/PageAddressUtil';

export default function BlogRequestTable({ name, description, domainName, address, rssAddress, adminEmail, requestedAt, updatedAt, approved, status, statusInfo, reason }) {
    const title = `博客「${name}」审核详情`;

    const blogAddress = approved ? getBlogAddress(domainName) : address;

    return (
        <Flex direction="column" gap="2">
            <Box>
                <Text size="3" weight="bold">{title}</Text>
            </Box>
            <Box>
                <Card>
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">博客名称</DataList.Label>
                            <DataList.Value>{name}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">博客描述</DataList.Label>
                            <DataList.Value>
                                {description}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">RSS 地址</DataList.Label>
                            <DataList.Value>
                                <Link target="_blank" href={rssAddress}>{rssAddress}</Link>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">博主邮箱</DataList.Label>
                            <DataList.Value>{adminEmail}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">提交时间</DataList.Label>
                            <DataList.Value>{requestedAt}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px">审核状态</DataList.Label>
                            <DataList.Value><Link href={blogAddress}>{statusInfo}</Link></DataList.Value>
                        </DataList.Item>
                        {
                            'approved' === status || 'rejected' === status || 'uncollected' === status ? <DataList.Item>
                                <DataList.Label minWidth="80px">审核时间</DataList.Label>
                                <DataList.Value>{updatedAt}</DataList.Value>
                            </DataList.Item> : ''
                        }
                        {
                            'rejected' === status || 'uncollected' === status ? <DataList.Item>
                                <DataList.Label minWidth="80px">驳回原因</DataList.Label>
                                <DataList.Value>{reason}</DataList.Value>
                            </DataList.Item> : ''
                        }
                    </DataList.Root>
                </Card>
            </Box>
        </Flex>
    )
}