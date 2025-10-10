import { Flex, Box, Text, Card, DataList, Link, Badge } from '@radix-ui/themes';
import { getBlogAddress } from '../../utils/PageAddressUtil';

export default function BlogRequestTable({ name, description, domainName, address, rssAddress, adminEmail, requestedAt, updatedAt, approved, failed, status, statusInfo, reason }) {
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
                            <DataList.Label minWidth="80px"><Text weight="bold">博客名称</Text></DataList.Label>
                            <DataList.Value><Link target="_blank" href={address}>{name}</Link></DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px"><Text weight="bold">博客描述</Text></DataList.Label>
                            <DataList.Value>
                                {description}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px"><Text weight="bold">RSS 地址</Text></DataList.Label>
                            <DataList.Value>
                                <Link target="_blank" href={rssAddress}>{rssAddress}</Link>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px"><Text weight="bold">博主邮箱</Text></DataList.Label>
                            <DataList.Value>{adminEmail}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px"><Text weight="bold">提交时间</Text></DataList.Label>
                            <DataList.Value>{requestedAt}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="80px"><Text weight="bold">审核状态</Text></DataList.Label>
                            <DataList.Value><Badge size="2" color={approved ? "green" : (failed ? "crimson" : "orange")}>{statusInfo}</Badge></DataList.Value>
                        </DataList.Item>
                        {
                            'approved' === status && <DataList.Item>
                                <DataList.Label minWidth="80px"><Text weight="bold">收录地址</Text></DataList.Label>
                                <DataList.Value><Link href={blogAddress}>{blogAddress}</Link></DataList.Value>
                            </DataList.Item>
                        }
                        {
                            'approved' === status || 'rejected' === status || 'uncollected' === status ? <DataList.Item>
                                <DataList.Label minWidth="80px"><Text weight="bold">审核时间</Text></DataList.Label>
                                <DataList.Value>{updatedAt}</DataList.Value>
                            </DataList.Item> : ''
                        }
                        {
                            'rejected' === status || 'uncollected' === status ? <DataList.Item>
                                <DataList.Label minWidth="80px"><Text weight="bold">驳回原因</Text></DataList.Label>
                                <DataList.Value>{reason}</DataList.Value>
                            </DataList.Item> : ''
                        }
                    </DataList.Root>
                </Card>
            </Box>
        </Flex>
    )
}